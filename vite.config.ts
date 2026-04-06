import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleChatRequest } from './src/server/chat-api'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const readBody = async (request: IncomingMessage) => {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf8')
}

const toHeaders = (headers: IncomingMessage['headers']) => {
  const normalized = new Headers()

  Object.entries(headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      normalized.set(key, value.join(', '))
      return
    }

    if (typeof value === 'string') {
      normalized.set(key, value)
    }
  })

  return normalized
}

const toWebRequest = async (request: IncomingMessage, origin: string) => {
  const body =
    request.method === 'GET' || request.method === 'HEAD' ? undefined : await readBody(request)

  return new Request(new URL(request.url || '/api/chat', origin), {
    method: request.method || 'GET',
    headers: toHeaders(request.headers),
    body,
  })
}

const writeWebResponse = async (response: ServerResponse, webResponse: Response) => {
  response.statusCode = webResponse.status
  webResponse.headers.forEach((value, key) => {
    response.setHeader(key, value)
  })

  if (!webResponse.body) {
    response.end()
    return
  }

  const reader = webResponse.body.getReader()

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    response.write(Buffer.from(value))
  }

  response.end()
}

const chatApiDevPlugin = (groqApiKey: string, siteUrl: string) => ({
  name: 'lilite-chat-api-dev',
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use('/api/chat', async (request, response, next) => {
      if (request.method !== 'POST' && request.method !== 'OPTIONS') {
        next()
        return
      }

      const requestOrigin =
        request.headers.host && request.headers.host.length > 0
          ? `${siteUrl.startsWith('https://') ? 'https' : 'http'}://${request.headers.host}`
          : siteUrl
      const webRequest = await toWebRequest(request, requestOrigin)
      const webResponse = await handleChatRequest(webRequest, {
        apiKey: groqApiKey,
        clientId: request.socket.remoteAddress,
        siteUrl,
      })

      await writeWebResponse(response, webResponse)
    })
  },
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const groqApiKey = env.GROQ_API_KEY ?? env.VITE_GROQ_API_KEY ?? env.GROQ_KEY ?? ''
  const siteUrl = (env.VITE_SITE_URL ?? 'http://localhost:5173').replace(/\/+$/, '')

  return {
    envPrefix: ['VITE_', 'GROQ_'],
    plugins: [react(), chatApiDevPlugin(groqApiKey, siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
