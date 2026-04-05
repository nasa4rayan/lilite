import Groq from 'groq-sdk'

declare const process: {
  env: {
    GROQ_API_KEY?: string
  }
}

interface IncomingMessage {
  content: string
  role: 'assistant' | 'user'
}

interface ChatRequestBody {
  messages?: IncomingMessage[]
  model?: string
  stream?: boolean
}

const DEFAULT_MODEL = 'llama-3.3-70b-versatile'
const ALLOWED_MODELS = new Set(['llama-3.3-70b-versatile', 'mixtral-8x7b-32768'])
const ASSISTANT_SYSTEM_PROMPT = `
You are Lilite Assistant for beginners.

Rules:
- Only help with Linux packages and troubleshooting on Arch-based, Debian-based, and Fedora-based systems.
- Be brief: 1 to 4 short lines by default.
- Match the user's language automatically:
  - Darija (Moroccan Arabic written in Arabic script or Latin script)
  - Arabic
  - French
  - English
- If mixed language input, answer in the dominant user language.
- Keep tone simple and practical for beginners.
- Prefer safe commands and explain each command in very few words.
- If user asks outside Linux package scope, politely redirect in the same language.
`.trim()

const sanitizeText = (value: string) => {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
}

const parseRequestBody = async (request: Request): Promise<ChatRequestBody | null> => {
  try {
    return (await request.json()) as ChatRequestBody
  } catch {
    return null
  }
}

const jsonResponse = (payload: unknown, status: number) => {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export const POST = async (request: Request): Promise<Response> => {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return jsonResponse(
      {
        error: 'Missing GROQ API key. Set process.env.GROQ_API_KEY before using /api/chat.',
      },
      500,
    )
  }

  const payload = await parseRequestBody(request)

  if (!payload?.messages?.length) {
    return jsonResponse({ error: 'Request must include at least one message.' }, 400)
  }

  const model = payload.model && ALLOWED_MODELS.has(payload.model) ? payload.model : DEFAULT_MODEL
  const stream = payload.stream !== false

  const normalizedMessages = payload.messages
    .filter((message) => message.role === 'assistant' || message.role === 'user')
    .map((message) => ({
      role: message.role,
      content: sanitizeText(message.content),
    }))
    .filter((message) => message.content.length > 0)

  if (!normalizedMessages.length) {
    return jsonResponse({ error: 'All provided messages were empty after sanitization.' }, 400)
  }

  const modelMessages = [{ role: 'system' as const, content: ASSISTANT_SYSTEM_PROMPT }, ...normalizedMessages]

  const groq = new Groq({ apiKey })

  try {
    if (stream) {
      const completion = await groq.chat.completions.create({
        messages: modelMessages,
        model,
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
          } catch (streamError) {
            const message = streamError instanceof Error ? streamError.message : 'Streaming failed.'
            controller.enqueue(encoder.encode(`\n[stream-error] ${message}`))
          } finally {
            controller.close()
          }
        },
      })

      return new Response(output, {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      })
    }

    const completion = await groq.chat.completions.create({
      messages: modelMessages,
      model,
      temperature: 0.2,
    })

    const reply = completion.choices?.[0]?.message?.content ?? ''

    return jsonResponse({ reply: sanitizeText(reply) }, 200)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Groq request failed.'
    return jsonResponse({ error: message }, 500)
  }
}
