import { handleChatRequest } from '@/server/chat-api'

declare const process: {
  env: {
    GROQ_API_KEY?: string
    VITE_SITE_URL?: string
  }
}

export const POST = async (request: Request): Promise<Response> => {
  return handleChatRequest(request, {
    apiKey: process.env.GROQ_API_KEY,
    siteUrl: process.env.VITE_SITE_URL,
  })
}

export const OPTIONS = async (request: Request): Promise<Response> => {
  return handleChatRequest(request, {
    apiKey: process.env.GROQ_API_KEY,
    siteUrl: process.env.VITE_SITE_URL,
  })
}
