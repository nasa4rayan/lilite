import Groq from 'groq-sdk'
import { sanitizeText } from '../lib/sanitizeText'

export interface ChatMessage {
  content: string
  role: 'assistant' | 'user'
}

export interface ChatPayload {
  messages?: ChatMessage[]
  stream?: boolean
}

interface NormalizedChatPayload {
  messages: ChatMessage[]
  stream: boolean
}

interface ChatHandlerOptions {
  apiKey?: string
  clientId?: string
  siteUrl?: string
}

const DEFAULT_SITE_URL = 'https://www.lilite.site'
const DEFAULT_MODEL = 'llama-3.3-70b-versatile'
const MAX_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 600
const MAX_TOTAL_CHARACTERS = 4_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 12
const API_RESPONSE_CSP = "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"

const ASSISTANT_SYSTEM_PROMPT = `
You are Lilite Assistant, a beginner-friendly Linux package helper for the Lilite website.

Scope:
- Help with Linux package installation basics, distro differences (Arch, Debian, Fedora, openSUSE, Alpine, and Ubuntu families), command explanation, package troubleshooting, and safe beginner workflows.
- Prefer official repositories and transparent commands.
- Keep answers simple, step-by-step, and short.
- Explain terms in plain language.

Behavior rules:
- If the user asks outside Linux package/help scope, politely refuse and redirect to Linux package questions.
- Do not provide harmful, destructive, or risky commands.
- Ask one short clarifying question only if strictly needed.
- When giving commands, show exactly what each command does in one line.
`.trim()

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const createResponseHeaders = (contentType: string, extraHeaders?: HeadersInit) => {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'Content-Security-Policy': API_RESPONSE_CSP,
    'Content-Type': contentType,
    'Referrer-Policy': 'same-origin',
    'X-Content-Type-Options': 'nosniff',
  })

  if (extraHeaders) {
    new Headers(extraHeaders).forEach((value, key) => {
      headers.set(key, value)
    })
  }

  return headers
}

const jsonResponse = (payload: unknown, status: number, extraHeaders?: HeadersInit) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: createResponseHeaders('application/json; charset=utf-8', extraHeaders),
  })

const textResponse = (body: BodyInit | null, status: number, extraHeaders?: HeadersInit) =>
  new Response(body, {
    status,
    headers: createResponseHeaders('text/plain; charset=utf-8', extraHeaders),
  })

const getAllowedOrigins = (request: Request, siteUrl?: string) => {
  const origins = new Set<string>()

  try {
    origins.add(new URL(request.url).origin)
  } catch {
    // Ignore invalid request URLs and fall back to the configured site URL.
  }

  try {
    origins.add(new URL(siteUrl ?? DEFAULT_SITE_URL).origin)
  } catch {
    origins.add(DEFAULT_SITE_URL)
  }

  return origins
}

const isAllowedOrigin = (request: Request, siteUrl?: string) => {
  const originHeader = request.headers.get('origin')

  if (!originHeader) {
    return true
  }

  try {
    return getAllowedOrigins(request, siteUrl).has(new URL(originHeader).origin)
  } catch {
    return false
  }
}

const getClientId = (request: Request, explicitClientId?: string) => {
  if (explicitClientId?.trim()) {
    return explicitClientId.trim()
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'anonymous'
  }

  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('origin') ||
    'anonymous'
  )
}

const enforceRateLimit = (clientId: string) => {
  const now = Date.now()

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key)
    }
  }

  const current = rateLimitStore.get(clientId)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return { allowed: true as const }
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false as const,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    }
  }

  current.count += 1
  rateLimitStore.set(clientId, current)

  return { allowed: true as const }
}

const parsePayload = async (request: Request): Promise<ChatPayload | null> => {
  const contentType = request.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    return null
  }

  try {
    return (await request.json()) as ChatPayload
  } catch {
    return null
  }
}

const normalizePayload = (payload: ChatPayload | null): { ok: true; value: NormalizedChatPayload } | { ok: false; response: Response } => {
  if (!payload?.messages?.length) {
    return {
      ok: false,
      response: jsonResponse({ error: 'Request must include at least one message.' }, 400),
    }
  }

  if (payload.messages.length > MAX_MESSAGES) {
    return {
      ok: false,
      response: jsonResponse(
        { error: `Request cannot include more than ${MAX_MESSAGES} messages.` },
        400,
      ),
    }
  }

  const messages = payload.messages
    .filter((message) => message.role === 'assistant' || message.role === 'user')
    .map((message) => ({
      role: message.role,
      content: sanitizeText(message.content).slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content.length > 0)

  if (!messages.length) {
    return {
      ok: false,
      response: jsonResponse(
        { error: 'All provided messages were empty after sanitization.' },
        400,
      ),
    }
  }

  const totalCharacters = messages.reduce((sum, message) => sum + message.content.length, 0)
  if (totalCharacters > MAX_TOTAL_CHARACTERS) {
    return {
      ok: false,
      response: jsonResponse(
        { error: `Combined message length must stay under ${MAX_TOTAL_CHARACTERS} characters.` },
        400,
      ),
    }
  }

  return {
    ok: true,
    value: {
      messages,
      stream: payload.stream !== false,
    },
  }
}

export const handleChatRequest = async (request: Request, options: ChatHandlerOptions = {}): Promise<Response> => {
  if (request.method === 'OPTIONS') {
    return textResponse(null, 204, { Allow: 'POST, OPTIONS' })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405, { Allow: 'POST, OPTIONS' })
  }

  if (!isAllowedOrigin(request, options.siteUrl)) {
    return jsonResponse({ error: 'Cross-origin requests are not allowed.' }, 403)
  }

  const rateLimit = enforceRateLimit(getClientId(request, options.clientId))
  if (!rateLimit.allowed) {
    return jsonResponse(
      { error: 'Too many chat requests. Please wait a minute and try again.' },
      429,
      { 'Retry-After': String(rateLimit.retryAfter) },
    )
  }

  const apiKey = options.apiKey?.trim()
  if (!apiKey) {
    return jsonResponse(
      { error: 'Chat is temporarily unavailable. Please try again later.' },
      503,
    )
  }

  const payload = await parsePayload(request)
  if (!payload) {
    return jsonResponse(
      { error: 'Request body must be valid JSON with application/json content type.' },
      400,
    )
  }

  const normalized = normalizePayload(payload)
  if (!normalized.ok) {
    return normalized.response
  }

  const groq = new Groq({ apiKey })
  const modelMessages = [
    { role: 'system' as const, content: ASSISTANT_SYSTEM_PROMPT },
    ...normalized.value.messages,
  ]

  try {
    if (normalized.value.stream) {
      const completion = await groq.chat.completions.create({
        messages: modelMessages,
        model: DEFAULT_MODEL,
        stream: true,
        temperature: 0.2,
      })

      const encoder = new TextEncoder()
      const output = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const delta = chunk.choices?.[0]?.delta?.content ?? ''
              if (delta) {
                controller.enqueue(encoder.encode(delta))
              }
            }
          } catch {
            controller.enqueue(
              encoder.encode('\nThe assistant could not finish the reply. Please try again.')
            )
          } finally {
            controller.close()
          }
        },
      })

      return textResponse(output, 200)
    }

    const completion = await groq.chat.completions.create({
      messages: modelMessages,
      model: DEFAULT_MODEL,
      temperature: 0.2,
    })

    const reply = completion.choices?.[0]?.message?.content ?? ''

    return jsonResponse({ reply: sanitizeText(reply) }, 200)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Groq request failed.'
    return jsonResponse({ error: message }, 502)
  }
}
