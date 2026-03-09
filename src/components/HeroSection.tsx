import { Link } from 'react-router-dom'
import { CheckCircle2, Copy, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function HeroSection() {
  const { messages } = useLanguage()

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{messages.hero.title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
          {messages.hero.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.manualReview}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1">
            <Copy className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.oneGroupedCommand}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.manualExecution}
          </span>
        </div>

        <div className="mt-5">
          <Link
            to="/get-started"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            {messages.hero.startBuilding}
          </Link>
        </div>
      </div>
    </section>
  )
}
