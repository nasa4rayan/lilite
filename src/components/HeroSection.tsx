import { Link } from 'react-router-dom'
import { CheckCircle2, Copy, ShieldCheck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Build Linux install commands with clarity, not guesswork
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
          Select packages from official repositories and generate one grouped install command. Lilite never executes
          anything automatically.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Manual review
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1">
            <Copy className="h-3.5 w-3.5 text-primary" /> One grouped command
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Manual execution
          </span>
        </div>

        <div className="mt-5">
          <Link
            to="/get-started"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Start Building
          </Link>
        </div>
      </div>
    </section>
  )
}
