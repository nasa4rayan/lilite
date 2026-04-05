'use client'

import React from 'react'
import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ChatMessage } from '@/components/chat-widget/use-chat-logic'

interface ChatMessageBubbleProps {
  message: ChatMessage
}

const ChatMessageBubbleComponent = ({ message }: ChatMessageBubbleProps) => {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={cn('flex w-full items-start gap-2', isAssistant ? 'justify-start' : 'justify-end')}>
      {isAssistant ? <Bot className="mt-2 h-4 w-4 shrink-0 text-primary" /> : null}
      <Card
        className={cn(
          'max-w-[86%] rounded-xl px-3 py-2 shadow-sm',
          isAssistant ? 'border-border bg-card text-card-foreground' : 'border-primary/30 bg-primary/10 text-foreground',
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
      </Card>
      {!isAssistant ? <User className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" /> : null}
    </div>
  )
}

const ChatMessageBubble = React.memo(ChatMessageBubbleComponent)

export { ChatMessageBubble }
