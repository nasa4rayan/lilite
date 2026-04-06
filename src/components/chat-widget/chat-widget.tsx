'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, RotateCcw, Send, X } from 'lucide-react'
import { LiloAvatar } from '@/components/chat-widget/lilo-avatar'
import { ChatMessageBubble } from '@/components/chat-widget/chat-message'
import { useChatLogic } from '@/components/chat-widget/use-chat-logic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLanguage } from '@/hooks/useLanguage'

const SCROLL_FOLLOW_THRESHOLD = 72
const LAUNCHER_NUDGE_DURATION_MS = 6800

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(true)
  const [showLauncherNudge, setShowLauncherNudge] = useState(false)
  const [shouldAnimateLauncher, setShouldAnimateLauncher] = useState(false)
  const [draft, setDraft] = useState('')
  const viewportRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)
  const { messages: appMessages } = useLanguage()
  const { clearMessages, error, isLoading, messages, sendMessage } = useChatLogic()

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (typeof window === 'undefined') {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.requestAnimationFrame(() => {
      const viewport = viewportRef.current
      if (!viewport) {
        return
      }

      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: reduceMotion ? 'auto' : behavior,
      })
    })
  }, [])

  const syncScrollState = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) {
      return
    }

    const distanceFromBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
    const nextIsNearBottom = distanceFromBottom <= SCROLL_FOLLOW_THRESHOLD
    shouldAutoScrollRef.current = nextIsNearBottom
    setIsNearBottom(nextIsNearBottom)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    shouldAutoScrollRef.current = true
    setIsNearBottom(true)
    scrollToBottom('auto')
  }, [isOpen, scrollToBottom])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTimer = window.setTimeout(() => {
      setShowLauncherNudge(true)
      if (!reduceMotion) {
        setShouldAnimateLauncher(true)
      }
    }, 700)

    const settleTimer = window.setTimeout(() => {
      setShouldAnimateLauncher(false)
      setShowLauncherNudge(false)
    }, LAUNCHER_NUDGE_DURATION_MS)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(settleTimer)
    }
  }, [])

  useEffect(() => {
    if (!isOpen || !shouldAutoScrollRef.current) {
      return
    }

    scrollToBottom(isLoading ? 'auto' : 'smooth')
  }, [isLoading, isOpen, messages, scrollToBottom])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = draft.trim()

    if (!message) {
      return
    }

    shouldAutoScrollRef.current = true
    setIsNearBottom(true)
    setDraft('')
    await sendMessage(message)
  }

  const handleToggleWidget = () => {
    setShouldAnimateLauncher(false)
    setShowLauncherNudge(false)
    setIsOpen((value) => !value)
  }

  return (
    <>
      <div
        className="fixed z-50 flex items-end gap-5"
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', right: 'max(1rem, env(safe-area-inset-right))' }}
      >
        {!isOpen && showLauncherNudge ? (
          <div className="hidden sm:block">
            <div className="lilo-launcher-bubble">
              <p className="lilo-launcher-bubble__title">Lilo</p>
              <p className="lilo-launcher-bubble__text">{appMessages.chatWidget.launcherHint}</p>
            </div>
          </div>
        ) : null}

        <Button
          variant="ghost"
          className={[
            'relative h-16 w-16 overflow-visible rounded-[1.75rem] border-0 bg-transparent p-0 shadow-none hover:bg-transparent hover:text-inherit active:bg-transparent',
            shouldAnimateLauncher && !isOpen ? 'lilo-launcher-attention' : '',
          ].join(' ')}
          size="sm"
          onClick={handleToggleWidget}
          aria-label={appMessages.chatWidget.toggleAria}
          aria-expanded={isOpen}
          aria-controls="lilite-chat-dialog"
        >
          {!isOpen ? (
            <>
              <span className="absolute -inset-2 rounded-[2rem] bg-primary/20 blur-2xl" aria-hidden="true" />
              {shouldAnimateLauncher ? (
                <span className="absolute inset-0 rounded-[1.75rem] border border-primary/30 lilo-launcher-ring" aria-hidden="true" />
              ) : null}
              <LiloAvatar size="lg" pulse={shouldAnimateLauncher} />
            </>
          ) : (
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-primary/20 bg-primary text-white shadow-xl">
              <X className="h-5 w-5" />
            </span>
          )}
        </Button>
      </div>

      <Card
        id="lilite-chat-dialog"
        role="dialog"
        aria-modal={isOpen}
        aria-label={appMessages.chatWidget.dialogAria}
        className={[
          'fixed z-50 overflow-hidden border-border/70 bg-[linear-gradient(180deg,hsl(var(--card)),hsl(var(--muted)/0.35))] backdrop-blur-xl',
          'inset-0 h-[100dvh] rounded-none md:inset-auto md:bottom-20 md:right-4 md:h-[36rem] md:w-[22rem] md:rounded-2xl',
          isOpen ? 'flex' : 'hidden',
          'flex-col',
        ].join(' ')}
      >
        <header className="flex items-center justify-between border-b border-border/70 bg-background/70 px-3 py-3 backdrop-blur-md">
          <div className="flex min-w-0 items-center gap-3">
            <LiloAvatar size="md" pulse={isLoading} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="truncate text-sm font-semibold tracking-tight text-foreground">{appMessages.chatWidget.title}</p>
                <span className="inline-flex items-center rounded-full border border-amber-500/25 bg-amber-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                  {appMessages.chatWidget.statusBadge}
                </span>
              </div>
              <p className="truncate text-[11px] font-medium text-muted-foreground">
                {appMessages.chatWidget.launcherHint}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 rounded-xl px-2 text-xs"
              onClick={clearMessages}
              aria-label={appMessages.chatWidget.clearHistoryAria}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="relative min-h-0 flex-1">
          <ScrollArea
            className="h-full min-h-0 px-3 py-3"
            viewportClassName="chat-scrollbar px-0.5"
            viewportRef={viewportRef}
            onViewportScroll={syncScrollState}
          >
            <div className="space-y-2 pb-4" aria-live="polite" aria-busy={isLoading}>
              {messages.length > 0 ? (
                messages.map((message) => <ChatMessageBubble key={message.id} message={message} />)
              ) : null}
              {isLoading ? <p className="px-1 text-xs text-muted-foreground">{appMessages.chatWidget.assistantTyping}</p> : null}
              {error ? <p className="px-1 text-xs text-destructive">{error}</p> : null}
            </div>
          </ScrollArea>

          {!isNearBottom && messages.length > 0 ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3">
              <Button
                type="button"
                size="sm"
                className="pointer-events-auto h-9 rounded-full border border-border/70 bg-background/95 px-3 shadow-lg backdrop-blur-sm"
                variant="outline"
                onClick={() => {
                  shouldAutoScrollRef.current = true
                  setIsNearBottom(true)
                  scrollToBottom('smooth')
                }}
                aria-label={appMessages.chatWidget.jumpToLatestAria}
              >
                <ChevronDown className="mr-1.5 h-4 w-4" />
                {appMessages.chatWidget.jumpToLatest}
              </Button>
            </div>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-border px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <div className="flex items-center gap-2">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={appMessages.chatWidget.inputPlaceholder}
              disabled={isLoading}
              maxLength={600}
              autoComplete="off"
              aria-label={appMessages.chatWidget.inputAria}
              className="h-11 rounded-xl bg-background/80"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !draft.trim()}
              aria-label={appMessages.chatWidget.sendAria}
              className="h-11 rounded-xl px-3 shadow-md"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}
