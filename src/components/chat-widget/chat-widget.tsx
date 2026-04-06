'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, Trash2, X } from 'lucide-react'
import { ChatMessageBubble } from '@/components/chat-widget/chat-message'
import { useChatLogic } from '@/components/chat-widget/use-chat-logic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLanguage } from '@/hooks/useLanguage'

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const viewportRef = useRef<HTMLDivElement>(null)
  const { messages: appMessages } = useLanguage()
  const { clearMessages, error, isLoading, messages, sendMessage } = useChatLogic()

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
      <div
        className="fixed z-50"
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', right: 'max(1rem, env(safe-area-inset-right))' }}
      >
        <Button
          className="h-12 w-12 rounded-full shadow-lg"
          size="sm"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={appMessages.chatWidget.toggleAria}
          aria-expanded={isOpen}
          aria-controls="lilite-chat-dialog"
        >
          {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </div>

      <Card
        id="lilite-chat-dialog"
        role="dialog"
        aria-modal={isOpen}
        aria-label={appMessages.chatWidget.dialogAria}
        className={[
          'fixed z-50 border-border bg-card/95 shadow-2xl backdrop-blur-sm',
          'inset-0 h-[100dvh] rounded-none md:inset-auto md:bottom-20 md:right-4 md:h-[36rem] md:w-[24rem] md:rounded-2xl',
          isOpen ? 'flex' : 'hidden',
          'flex-col',
        ].join(' ')}
      >
        <header className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
              <Bot className="h-4 w-4 text-primary" />
            </span>
            <p className="text-sm font-semibold text-foreground">{appMessages.chatWidget.title}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-2 text-xs"
              onClick={clearMessages}
              aria-label={appMessages.chatWidget.clearHistoryAria}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-2 text-xs"
              onClick={() => setIsOpen(false)}
              aria-label={appMessages.chatWidget.closeAria}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <ScrollArea className="min-h-0 flex-1 px-3 py-3" viewportRef={viewportRef}>
          <div className="space-y-2 pb-1" aria-live="polite" aria-busy={isLoading}>
            {messages.length === 0 ? (
              <Card className="rounded-xl border-dashed bg-muted/40 p-3 text-sm text-muted-foreground shadow-none">
                {appMessages.chatWidget.emptyState}
              </Card>
            ) : (
              messages.map((message) => <ChatMessageBubble key={message.id} message={message} />)
            )}
            {isLoading ? <p className="text-xs text-muted-foreground">{appMessages.chatWidget.assistantTyping}</p> : null}
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="border-t border-border px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <div className="flex items-center gap-2">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={appMessages.chatWidget.inputPlaceholder}
              disabled={isLoading}
              aria-label={appMessages.chatWidget.inputAria}
              className="h-10"
            />
            <Button type="submit" size="sm" disabled={isLoading || !draft.trim()} aria-label={appMessages.chatWidget.sendAria}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}
