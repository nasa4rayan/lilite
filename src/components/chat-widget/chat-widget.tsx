'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, Trash2, X } from 'lucide-react'
import { ChatMessageBubble } from '@/components/chat-widget/chat-message'
import { useChatLogic } from '@/components/chat-widget/use-chat-logic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select } from '@/components/ui/select'

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const viewportRef = useRef<HTMLDivElement>(null)
  const { availableModels, clearMessages, error, isLoading, messages, model, sendMessage, setModel } = useChatLogic()

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
        <Button className="h-12 w-12 rounded-full shadow-lg" size="sm" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle AI chat">
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </div>

      <Card
        className={[
          'fixed z-50 border-border bg-card/95 shadow-2xl backdrop-blur-sm',
          'inset-0 rounded-none md:inset-auto md:bottom-20 md:right-4 md:h-[36rem] md:w-[24rem] md:rounded-2xl',
          isOpen ? 'flex' : 'hidden',
          'flex-col',
        ].join(' ')}
      >
        <header className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
              <Bot className="h-4 w-4 text-primary" />
            </span>
            <p className="text-sm font-semibold text-foreground">Lilite AI Assistant</p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clearMessages} aria-label="Clear chat history">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => setIsOpen(false)} aria-label="Close AI chat">
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
            onValueChange={(value) => setModel(value as typeof model)}
            options={availableModels.map((option) => ({ label: option, value: option }))}
          />
        </div>

        <ScrollArea className="min-h-0 flex-1 px-3 py-3" viewportRef={viewportRef}>
          <div className="space-y-2 pb-1">
            {messages.length === 0 ? (
              <Card className="rounded-xl border-dashed bg-muted/40 p-3 text-sm text-muted-foreground shadow-none">
                Ask beginner Linux package questions.
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
