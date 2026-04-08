import { handleChatRequest } from '@/server/chat-api'

declare const process: {
  env: {
    GROQ_API_KEY?: string
    GROQ_KEY?: string
    VITE_GROQ_API_KEY?: string
    VITE_SITE_URL?: string
  }
}

const resolveGroqApiKey = () =>
  process.env.GROQ_API_KEY?.trim() ||
  process.env.VITE_GROQ_API_KEY?.trim() ||
  process.env.GROQ_KEY?.trim() ||
  ''

export const POST = async (request: Request): Promise<Response> => {
  return handleChatRequest(request, {
    apiKey: resolveGroqApiKey(),
    siteUrl: process.env.VITE_SITE_URL,
  })
}

export const OPTIONS = async (request: Request): Promise<Response> => {
  return handleChatRequest(request, {
    apiKey: resolveGroqApiKey(),
    siteUrl: process.env.VITE_SITE_URL,
  })
}
