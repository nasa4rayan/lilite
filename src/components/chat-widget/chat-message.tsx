'use client'

import React from 'react'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ChatMessage } from '@/components/chat-widget/use-chat-logic'
import { LiloAvatar } from '@/components/chat-widget/lilo-avatar'

interface ChatMessageBubbleProps {
  message: ChatMessage
}

const ChatMessageBubbleComponent = ({ message }: ChatMessageBubbleProps) => {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={cn('flex w-full items-start gap-2', isAssistant ? 'justify-start' : 'justify-end')}>
      {isAssistant ? <LiloAvatar size="sm" className="mt-1" /> : null}
      <Card
        className={cn(
          'max-w-[86%] rounded-2xl px-3 py-2.5 shadow-sm',
          isAssistant
            ? 'border-primary/15 bg-[linear-gradient(180deg,hsl(var(--card)),hsl(var(--muted)/0.55))] text-card-foreground'
            : 'border-primary/30 bg-primary/10 text-foreground',
        )}
      >
        {isAssistant ? (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary/80">
            Lilo
          </p>
        ) : null}
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
      </Card>
      {!isAssistant ? <User className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" /> : null}
    </div>
  )
}

const ChatMessageBubble = React.memo(ChatMessageBubbleComponent)

export { ChatMessageBubble }
