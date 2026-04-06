'use client'

import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

type LiloAvatarSize = 'sm' | 'md' | 'lg'

interface LiloAvatarProps {
  className?: string
  pulse?: boolean
  size?: LiloAvatarSize
}

const sizeClasses: Record<
  LiloAvatarSize,
  {
    antenna: string
    glow: string
    icon: string
    inner: string
    outer: string
    smile: string
  }
> = {
  sm: {
    antenna: 'h-2.5 w-2.5',
    glow: '-inset-1',
    icon: 'h-[1.125rem] w-[1.125rem]',
    inner: 'inset-[2px] rounded-[0.9rem]',
    outer: 'h-9 w-9 rounded-[1.05rem]',
    smile: 'h-1 w-4',
  },
  md: {
    antenna: 'h-3 w-3',
    glow: '-inset-1.5',
    icon: 'h-5 w-5',
    inner: 'inset-[2px] rounded-[1rem]',
    outer: 'h-10 w-10 rounded-[1.2rem]',
    smile: 'h-1 w-4.5',
  },
  lg: {
    antenna: 'h-3.5 w-3.5',
    glow: '-inset-2',
    icon: 'h-7 w-7',
    inner: 'inset-[3px] rounded-[1.3rem]',
    outer: 'h-14 w-14 rounded-[1.5rem]',
    smile: 'h-1.5 w-6',
  },
}

export function LiloAvatar({ className, pulse = false, size = 'md' }: LiloAvatarProps) {
  const styles = sizeClasses[size]

  return (
    <span className={cn('relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden', styles.outer, className)}>
      <span
        className={cn(
          'absolute rounded-[inherit] bg-gradient-to-br from-primary via-emerald-400 to-sky-400 opacity-90 blur-lg',
          styles.glow,
          pulse ? 'lilo-glow-pulse' : '',
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'absolute inset-0 rounded-[inherit] bg-[linear-gradient(160deg,hsl(var(--primary)),hsl(160_72%_54%),hsl(197_90%_62%))] shadow-[0_10px_30px_hsl(var(--primary)/0.35)]',
          pulse ? 'lilo-shell-shimmer' : '',
        )}
        aria-hidden="true"
      />
      <span className={cn('absolute border border-white/20 bg-slate-950/15 backdrop-blur-sm', styles.inner)} aria-hidden="true" />
      <span
        className={cn(
          'absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[35%] rounded-full bg-sky-100 shadow-[0_0_0_4px_hsl(var(--background)/0.55)]',
          styles.antenna,
        )}
        aria-hidden="true"
      />
      <Bot className={cn('relative z-10 text-white drop-shadow-sm', styles.icon)} strokeWidth={2.1} aria-hidden="true" />
      <span
        className={cn(
          'absolute bottom-[22%] left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/65 blur-[0.4px]',
          styles.smile,
        )}
        aria-hidden="true"
      />
    </span>
  )
}
