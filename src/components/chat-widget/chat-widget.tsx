'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select } from '@/components/ui/select'
import { ChatMessageBubble } from '@/components/chat-widget/chat-message'
import { useChatLogic } from '@/components/chat-widget/use-chat-logic'

interface ChatWidgetProps {
  persistHistory?: boolean
  defaultModel?: string
}

export const ChatWidget = ({ persistHistory = true, defaultModel = 'llama-3.3-70b-versatile' }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [useClientApiKey, setUseClientApiKey] = useState(false)
  const [clientApiKey, setClientApiKey] = useState('')
  const viewportRef = useRef<HTMLDivElement>(null)

  const { availableModels, clearMessages, error, isLoading, messages, model, sendMessage, setModel } = useChatLogic({
    persistHistory,
    initialModel: defaultModel,
    useClientApiKey,
    clientApiKey,
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const savedMode = window.sessionStorage.getItem('lilite-chat-use-client-key')
    const savedKey = window.sessionStorage.getItem('lilite-chat-client-key')

    if (savedMode === 'true') {
      setUseClientApiKey(true)
    }

    if (savedKey) {
      setClientApiKey(savedKey)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.sessionStorage.setItem('lilite-chat-use-client-key', String(useClientApiKey))
    window.sessionStorage.setItem('lilite-chat-client-key', clientApiKey)
  }, [clientApiKey, useClientApiKey])

  useEffect(() => {
    if (!viewportRef.current) {
      return
    }

    viewportRef.current.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isLoading])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const message = draft.trim()
    if (!message) {
      return
    }

    setDraft('')
    await sendMessage(message)
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button aria-label="Toggle AI chat" className="h-12 w-12 rounded-full shadow-lg" onClick={() => setIsOpen((value) => !value)} size="sm">
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </div>

      <Card
        className={[
          'fixed z-50 border-border bg-card/95 shadow-2xl backdrop-blur-sm',
          'inset-0 rounded-none md:inset-auto md:bottom-6 md:right-6 md:h-[36rem] md:w-[24rem] md:rounded-2xl',
          isOpen ? 'flex' : 'hidden',
          'flex-col',
        ].join(' ')}
      >
        <header className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
              <Bot className="h-4 w-4 text-primary" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Lilite AI Assistant</p>
              <p className="text-xs text-muted-foreground">Package and command guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={clearMessages}
              aria-label="Clear chat history"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="border-b border-border px-3 py-2">
          <label htmlFor="chat-model" className="mb-1 block text-[11px] font-medium text-muted-foreground">
            AI Model
          </label>
          <Select
            id="chat-model"
            value={model}
            onValueChange={setModel}
            options={availableModels.map((option) => ({ label: option, value: option }))}
          />
          <div className="mt-2 space-y-2">
            <Button
              type="button"
              variant={useClientApiKey ? 'default' : 'outline'}
              size="sm"
              className="h-8 w-full text-xs"
              onClick={() => setUseClientApiKey((value) => !value)}
            >
              {useClientApiKey ? 'BYOK Mode: ON' : 'BYOK Mode: OFF'}
            </Button>
            {useClientApiKey ? (
              <Input
                type="password"
                value={clientApiKey}
                onChange={(event) => setClientApiKey(event.target.value)}
                placeholder="Paste your Groq key (gsk_...)"
                className="h-9 text-xs"
                aria-label="Your Groq API key"
              />
            ) : null}
          </div>
        </div>

        <ScrollArea className="min-h-0 flex-1 px-3 py-3" viewportRef={viewportRef}>
          <div className="space-y-2 pb-1">
            {messages.length === 0 ? (
              <Card className="rounded-xl border-dashed bg-muted/40 p-3 text-sm text-muted-foreground shadow-none">
                Ask anything about Linux packages, install commands, or distro choices.
              </Card>
            ) : (
              messages.map((message) => <ChatMessageBubble key={message.id} message={message} />)
            )}

            {isLoading ? <p className="text-xs text-muted-foreground">Assistant is typing...</p> : null}
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="border-t border-border px-3 py-3">
          <div className="flex items-center gap-2">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              aria-label="Chat input"
            />
            <Button type="submit" size="sm" disabled={isLoading || !draft.trim()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}
