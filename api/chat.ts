import { handleChatRequest } from '../src/server/chat-api.js'

interface NodeRequestLike {
  body?: unknown
  headers: Record<string, string | string[] | undefined>
  method?: string
  socket?: {
    remoteAddress?: string
  }
  url?: string
  [Symbol.asyncIterator]?: () => AsyncIterableIterator<Uint8Array | string>
}

interface NodeResponseLike {
  end: (chunk?: Buffer | string) => void
  setHeader: (name: string, value: string) => void
  statusCode: number
  write: (chunk: Buffer | string) => void
}

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!value || Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

const readBody = async (request: NodeRequestLike) => {
  if (typeof request.body === 'string') {
    return request.body
  }

  if (Buffer.isBuffer(request.body)) {
    return request.body.toString('utf8')
  }

  if (request.body instanceof Uint8Array) {
    return Buffer.from(request.body).toString('utf8')
  }

  if (Array.isArray(request.body) || isPlainObject(request.body)) {
    return JSON.stringify(request.body)
  }

  const iterator = request[Symbol.asyncIterator]?.()
  if (!iterator) {
    return ''
  }

  const chunks: Buffer[] = []

  for await (const chunk of iterator) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf8')
}

const toHeaders = (headers: NodeRequestLike['headers']) => {
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

const writeResponse = async (response: NodeResponseLike, webResponse: Response) => {
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

const resolveGroqApiKey = () =>
  process.env.GROQ_API_KEY?.trim() ||
  process.env.VITE_GROQ_API_KEY?.trim() ||
  process.env.GROQ_KEY?.trim() ||
  ''

export default async function handler(request: NodeRequestLike, response: NodeResponseLike) {
  try {
    const host = Array.isArray(request.headers.host) ? request.headers.host[0] : request.headers.host
    const protocolHeader = Array.isArray(request.headers['x-forwarded-proto'])
      ? request.headers['x-forwarded-proto'][0]
      : request.headers['x-forwarded-proto']
    const protocol = protocolHeader || 'https'
    const origin = `${protocol}://${host || 'www.lilite.site'}`
    const body =
      request.method === 'GET' || request.method === 'HEAD'
        ? undefined
        : await readBody(request)

    const webRequest = new Request(new URL(request.url || '/api/chat', origin), {
      method: request.method || 'GET',
      headers: toHeaders(request.headers),
      body,
    })

    const webResponse = await handleChatRequest(webRequest, {
      apiKey: resolveGroqApiKey(),
      clientId: request.socket?.remoteAddress,
      siteUrl: process.env.VITE_SITE_URL || origin,
    })

    await writeResponse(response, webResponse)
  } catch (error) {
    console.error('Chat API wrapper failed:', error)
    response.statusCode = 500
    response.setHeader('Cache-Control', 'no-store')
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.setHeader('X-Content-Type-Options', 'nosniff')
    response.end(
      JSON.stringify({
        error: 'Chat is temporarily unavailable. Please try again later.',
      }),
    )
  }
}
