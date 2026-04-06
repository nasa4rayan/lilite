'use client'

import { useCallback, useMemo, useState } from 'react'
import { GROQ_API_KEY, GROQ_API_URL, GROQ_DEFAULT_MODEL } from '@/config/groq'
import { useLanguage } from '@/hooks/useLanguage'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

interface UseChatLogicResult {
  clearMessages: () => void
  error: string | null
  isLoading: boolean
  messages: ChatMessage[]
  sendMessage: (content: string) => Promise<void>
}

interface GroqStreamChunk {
  choices?: Array<{
    delta?: {
      content?: string
    }
  }>
}

const SYSTEM_PROMPT = `
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

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const sanitizeText = (value: string) => {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
}

export const useChatLogic = (): UseChatLogicResult => {
  const { messages: appMessages } = useLanguage()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      const userText = sanitizeText(content)
      const apiKey = GROQ_API_KEY.trim()

      if (!userText || isLoading) {
        return
      }

      if (!apiKey || apiKey === 'REPLACE_WITH_YOUR_GROQ_API_KEY') {
        setError(appMessages.chatWidget.errors.missingApiKey)
        return
      }

      setError(null)
      setIsLoading(true)

      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: userText,
        createdAt: Date.now(),
      }

      const assistantMessageId = generateId()
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
      }

      const nextMessages = [...messages, userMessage, assistantMessage]
      setMessages(nextMessages)

      try {
        const response = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: GROQ_DEFAULT_MODEL,
            stream: true,
            temperature: 0.2,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...nextMessages
                .filter((message) => message.role === 'assistant' || message.role === 'user')
                .map((message) => ({ role: message.role, content: message.content })),
            ],
          }),
        })

        if (!response.ok) {
          throw new Error(`Groq request failed (${response.status}).`)
        }

        if (!response.body) {
          throw new Error(appMessages.chatWidget.errors.noResponseBody)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let aggregated = ''
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()

          if (done) {
            break
          }

          buffer += decoder.decode(value, { stream: true })
          const events = buffer.split('\n\n')
          buffer = events.pop() ?? ''

          events.forEach((eventText) => {
            const line = eventText
              .split('\n')
              .map((item) => item.trim())
              .find((item) => item.startsWith('data:'))

            if (!line) {
              return
            }

            const payload = line.replace(/^data:\s*/, '')

            if (!payload || payload === '[DONE]') {
              return
            }

            try {
              const parsed = JSON.parse(payload) as GroqStreamChunk
              const delta = parsed.choices?.[0]?.delta?.content ?? ''

              if (delta) {
                aggregated += delta
              }
            } catch {
              // Ignore malformed partial payloads.
            }
          })

          const safe = sanitizeText(aggregated)
          setMessages((current) =>
            current.map((message) => (message.id === assistantMessageId ? { ...message, content: safe } : message)),
          )
        }
      } catch (chatError) {
        const message = chatError instanceof Error ? chatError.message : appMessages.chatWidget.errors.fetchFailed
        setError(message)
        setMessages((current) =>
          current.map((item) => (item.id === assistantMessageId ? { ...item, content: message } : item)),
        )
      } finally {
        setIsLoading(false)
      }
    },
    [appMessages.chatWidget.errors.fetchFailed, appMessages.chatWidget.errors.missingApiKey, appMessages.chatWidget.errors.noResponseBody, isLoading, messages],
  )

  return useMemo(
    () => ({
      clearMessages,
      error,
      isLoading,
      messages,
      sendMessage,
    }),
    [clearMessages, error, isLoading, messages, sendMessage],
  )
}

export type { ChatMessage }
