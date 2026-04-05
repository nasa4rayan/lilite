'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

interface UseChatLogicOptions {
  persistHistory?: boolean
  initialModel?: string
}

interface UseChatLogicResult {
  availableModels: string[]
  clearMessages: () => void
  error: string | null
  isLoading: boolean
  messages: ChatMessage[]
  model: string
  sendMessage: (content: string) => Promise<void>
  setModel: (model: string) => void
}

interface ChatRequestBody {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  model: string
  stream: boolean
}

const STORAGE_KEY = 'lilite-chat-widget-history'
const MODEL_STORAGE_KEY = 'lilite-chat-widget-model'

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const sanitizeText = (value: string) => {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
}

const MODEL_OPTIONS = ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768']

export const useChatLogic = ({ persistHistory = true, initialModel = MODEL_OPTIONS[0] }: UseChatLogicOptions = {}): UseChatLogicResult => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState(() => (MODEL_OPTIONS.includes(initialModel) ? initialModel : MODEL_OPTIONS[0]))

  useEffect(() => {
    if (!persistHistory || typeof window === 'undefined') {
      return
    }

    const raw = window.sessionStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return
    }

    try {
      const parsed = JSON.parse(raw) as ChatMessage[]
      if (Array.isArray(parsed)) {
        setMessages(parsed)
      }
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [persistHistory])

  useEffect(() => {
    if (!persistHistory || typeof window === 'undefined') {
      return
    }

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages, persistHistory])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const savedModel = window.sessionStorage.getItem(MODEL_STORAGE_KEY)
    if (savedModel && MODEL_OPTIONS.includes(savedModel)) {
      setModel(savedModel)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.sessionStorage.setItem(MODEL_STORAGE_KEY, model)
  }, [model])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      const sanitizedInput = sanitizeText(content)
      if (!sanitizedInput || isLoading) {
        return
      }

      setError(null)
      setIsLoading(true)

      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: sanitizedInput,
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

      const requestBody: ChatRequestBody = {
        messages: nextMessages.map((message) => ({ role: message.role, content: message.content })),
        model,
        stream: true,
      }

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null
          throw new Error(payload?.error ?? 'Chat request failed.')
        }

        if (!response.body) {
          const payload = (await response.json()) as { reply?: string }
          const safeContent = sanitizeText(payload.reply ?? '')

          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId ? { ...message, content: safeContent || 'No response received.' } : message,
            ),
          )

          return
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let streamedContent = ''

        while (true) {
          const { done, value } = await reader.read()

          if (done) {
            break
          }

          streamedContent += decoder.decode(value, { stream: true })
          const safeContent = sanitizeText(streamedContent)

          setMessages((current) =>
            current.map((message) => (message.id === assistantMessageId ? { ...message, content: safeContent } : message)),
          )
        }
      } catch (chatError) {
        const fallbackMessage = chatError instanceof Error ? chatError.message : 'Unable to fetch AI response.'
        setError(fallbackMessage)
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessageId ? { ...message, content: `Error: ${fallbackMessage}` } : message,
          ),
        )
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages, model],
  )

  return useMemo(
    () => ({
      availableModels: MODEL_OPTIONS,
      clearMessages,
      error,
      isLoading,
      messages,
      model,
      sendMessage,
      setModel,
    }),
    [clearMessages, error, isLoading, messages, model, sendMessage],
  )
}

export type { ChatMessage }
