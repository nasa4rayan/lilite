import { Link } from 'react-router-dom'
import { LogoMark } from '@/components/LogoMark'
import { useLanguage } from '@/hooks/useLanguage'
import { useSEO } from '@/hooks/useSEO'

export function NotFoundPage() {
  const { messages } = useLanguage()

  useSEO({
    title: messages.notFound.seoTitle,
    description: messages.notFound.seoDescription,
    noindex: true,
  })

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-20 sm:px-6">
      <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
        <LogoMark className="h-3.5 w-3.5 rounded-sm" alt="Lilite logo" /> {messages.notFound.codeLabel}
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">{messages.notFound.title}</h1>
      <p className="max-w-lg text-muted-foreground">{messages.notFound.description}</p>
      <Link
        to="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {messages.notFound.backToHome}
      </Link>
    </main>
  )
}
