'use client'

import { useCallback, useMemo, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { sanitizeText } from '@/lib/sanitizeText'

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

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
const CHAT_MODEL = 'llama-3.3-70b-versatile'
const CLIENT_GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const clientEnv = import.meta.env as Record<string, string | boolean | undefined>
const CLIENT_GROQ_API_KEY =
  (typeof clientEnv.GROQ_API_KEY === 'string' ? clientEnv.GROQ_API_KEY : undefined)?.trim() ||
  (typeof clientEnv.VITE_GROQ_API_KEY === 'string' ? clientEnv.VITE_GROQ_API_KEY : undefined)?.trim() ||
  (typeof clientEnv.GROQ_KEY === 'string' ? clientEnv.GROQ_KEY : undefined)?.trim() ||
  (typeof clientEnv.VITE_GROQ_KEY === 'string' ? clientEnv.VITE_GROQ_KEY : undefined)?.trim() ||
  ''
const CLIENT_SYSTEM_PROMPT = `
You are Lilite Assistant, a beginner-friendly Linux package helper for the Lilite website.

Scope:
- Help with Linux package installation basics, distro differences, command explanation, package troubleshooting, and safe beginner workflows.
- Prefer official repositories and transparent commands.
- Keep answers simple, step-by-step, and short.
- Explain terms in plain language.

Behavior rules:
- If the user asks outside Linux package/help scope, politely refuse and redirect to Linux package questions.
- Do not provide harmful, destructive, or risky commands.
- Ask one short clarifying question only if strictly needed.
- When giving commands, show exactly what each command does in one line.
`.trim()

const normalizeRequestMessages = (messages: ChatMessage[]) =>
  messages
    .filter((message) => message.role === 'assistant' || message.role === 'user')
    .map((message) => ({ role: message.role, content: message.content }))

const readErrorMessage = async (response: Response) => {
  const fallbackMessage = `Chat request failed (${response.status}).`

  try {
    const payload = (await response.json()) as {
      error?: string | { message?: string }
    }
    if (typeof payload.error === 'string' && payload.error.trim()) {
      return payload.error
    }

    if (payload.error && typeof payload.error === 'object' && typeof payload.error.message === 'string' && payload.error.message.trim()) {
      return payload.error.message
    }
  } catch {
    // Ignore JSON parsing errors and fall back to the status-based message.
  }

  return fallbackMessage
}

const requestServerReply = async (
  requestMessages: Array<{ content: string; role: 'assistant' | 'user' }>,
  onChunk: (content: string) => void,
  noResponseBodyMessage: string,
) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stream: true,
      messages: requestMessages,
    }),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  if (!response.body) {
    throw new Error(noResponseBodyMessage)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let aggregated = ''

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    aggregated += decoder.decode(value, { stream: true })
    onChunk(aggregated)
  }
}

const requestBrowserReply = async (requestMessages: Array<{ content: string; role: 'assistant' | 'user' }>) => {
  if (!CLIENT_GROQ_API_KEY) {
    throw new Error('Chat is temporarily unavailable. Please try again later.')
  }

  const response = await fetch(CLIENT_GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CLIENT_GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      stream: false,
      temperature: 0.2,
      messages: [
        { role: 'system', content: CLIENT_SYSTEM_PROMPT },
        ...requestMessages,
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const payload = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string
      }
    }>
  }

  return sanitizeText(payload.choices?.[0]?.message?.content ?? '')
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

      if (!userText || isLoading) {
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
        const requestMessages = normalizeRequestMessages(nextMessages)

        if (CLIENT_GROQ_API_KEY) {
          const reply = await requestBrowserReply(requestMessages)
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId ? { ...message, content: reply || appMessages.chatWidget.errors.noResponseBody } : message,
            ),
          )
          return
        }

        try {
          await requestServerReply(
            requestMessages,
            (aggregated) => {
              setMessages((current) =>
                current.map((message) =>
                  message.id === assistantMessageId ? { ...message, content: aggregated } : message,
                ),
              )
            },
            appMessages.chatWidget.errors.noResponseBody,
          )
        } catch (serverError) {
          if (!CLIENT_GROQ_API_KEY) {
            throw serverError
          }

          const reply = await requestBrowserReply(requestMessages)
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId ? { ...message, content: reply || appMessages.chatWidget.errors.noResponseBody } : message,
            ),
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
    [appMessages.chatWidget.errors.fetchFailed, appMessages.chatWidget.errors.noResponseBody, isLoading, messages],
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
