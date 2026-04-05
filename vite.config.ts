import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import Groq from 'groq-sdk'
import type { IncomingMessage, ServerResponse } from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface ChatMessage {
  role: 'assistant' | 'user'
  content: string
}

interface ChatPayload {
  messages?: ChatMessage[]
  model?: string
  stream?: boolean
}

const DEFAULT_MODEL = 'llama-3.3-70b-versatile'
const ALLOWED_MODELS = new Set(['llama-3.3-70b-versatile', 'mixtral-8x7b-32768'])
const ASSISTANT_SYSTEM_PROMPT = `
You are Lilite Assistant, a beginner-friendly Linux package helper for the Lilite website.

Scope:
- Help with Linux package installation basics, distro differences (Arch/Debian/Fedora families), command explanation, package troubleshooting, and safe beginner workflows.
- Prefer official repositories and transparent commands.
- Keep answers simple, step-by-step, and short.
- Explain terms in plain language.

Behavior rules:
- If the user asks outside Linux package/help scope, politely refuse and redirect to Linux package questions.
- Do not provide harmful, destructive, or risky commands.
- Ask one short clarifying question only if strictly needed.
- When giving commands, show exactly what each command does in one line.
`.trim()

const sanitizeText = (value: string): string => {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
}

const readJsonBody = async (request: IncomingMessage): Promise<ChatPayload | null> => {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  if (chunks.length === 0) {
    return null
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as ChatPayload
  } catch {
    return null
  }
}

const writeJson = (response: ServerResponse, statusCode: number, payload: unknown) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(payload))
}

const chatApiDevPlugin = (groqApiKey: string) => ({
  name: 'lilite-chat-api-dev',
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use('/api/chat', async (request, response, next) => {
      if (request.method !== 'POST') {
        next()
        return
      }

      const apiKey = groqApiKey.trim()
      if (!apiKey) {
        writeJson(response, 500, { error: 'Missing GROQ_API_KEY in .env.local' })
        return
      }

      const payload = await readJsonBody(request)
      if (!payload?.messages?.length) {
        writeJson(response, 400, { error: 'Request must include at least one message.' })
        return
      }

      const model = payload.model && ALLOWED_MODELS.has(payload.model) ? payload.model : DEFAULT_MODEL
      const stream = payload.stream !== false
      const messages = payload.messages
        .filter((message) => message.role === 'assistant' || message.role === 'user')
        .map((message) => ({ role: message.role, content: sanitizeText(message.content) }))
        .filter((message) => message.content.length > 0)

      if (!messages.length) {
        writeJson(response, 400, { error: 'All provided messages were empty after sanitization.' })
        return
      }

      const modelMessages = [{ role: 'system' as const, content: ASSISTANT_SYSTEM_PROMPT }, ...messages]

      const groq = new Groq({ apiKey })

      try {
        if (stream) {
          const completion = await groq.chat.completions.create({
            model,
            messages: modelMessages,
            stream: true,
            temperature: 0.2,
          })

          response.statusCode = 200
          response.setHeader('Content-Type', 'text/plain; charset=utf-8')
          response.setHeader('Cache-Control', 'no-store')
          response.setHeader('Transfer-Encoding', 'chunked')

          for await (const chunk of completion) {
            const delta = chunk.choices?.[0]?.delta?.content ?? ''
            if (delta) {
              response.write(delta)
            }
          }

          response.end()
          return
        }

        const completion = await groq.chat.completions.create({
          model,
          messages: modelMessages,
          temperature: 0.2,
        })
        const reply = completion.choices?.[0]?.message?.content ?? ''
        writeJson(response, 200, { reply: sanitizeText(reply) })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Groq request failed.'
        writeJson(response, 500, { error: message })
      }
    })
  },
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const groqApiKey = env.GROQ_API_KEY ?? ''

  return {
    plugins: [react(), chatApiDevPlugin(groqApiKey)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
