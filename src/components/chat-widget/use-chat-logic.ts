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
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stream: true,
            messages: nextMessages
              .filter((message) => message.role === 'assistant' || message.role === 'user')
              .map((message) => ({ role: message.role, content: message.content })),
          }),
        })

        if (!response.ok) {
          const fallbackMessage = `Chat request failed (${response.status}).`
          let responseMessage = fallbackMessage

          try {
            const payload = (await response.json()) as { error?: string }
            responseMessage = payload.error || fallbackMessage
          } catch {
            // Ignore JSON parsing errors and fall back to the status-based message.
          }

          throw new Error(responseMessage)
        }

        if (!response.body) {
          throw new Error(appMessages.chatWidget.errors.noResponseBody)
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
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId ? { ...message, content: aggregated } : message,
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
