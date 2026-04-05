import { Link } from 'react-router-dom'
import { CheckCircle2, Copy, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function HeroSection() {
  const { messages } = useLanguage()
  const communityApps = [
    { name: 'Arch', logo: 'https://cdn.simpleicons.org/archlinux' },
    { name: 'Debian', logo: 'https://cdn.simpleicons.org/debian' },
    { name: 'Fedora', logo: 'https://cdn.simpleicons.org/fedora' },
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker' },
    { name: 'Git', logo: 'https://cdn.simpleicons.org/git' },
    { name: 'Neovim', logo: 'https://cdn.simpleicons.org/neovim' },
    { name: 'Firefox', logo: 'https://cdn.simpleicons.org/firefoxbrowser' },
    { name: 'Krita', logo: 'https://cdn.simpleicons.org/krita' },
  ]

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/10 p-6 shadow-sm sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />

          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{messages.hero.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
            {messages.hero.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-md border bg-background/80 px-2 py-1 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.manualReview}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border bg-background/80 px-2 py-1 backdrop-blur">
              <Copy className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.oneGroupedCommand}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border bg-background/80 px-2 py-1 backdrop-blur">
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

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
            {communityApps.map((app) => (
              <span
                key={app.name}
                className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur"
              >
                <img src={app.logo} alt="" className="h-4 w-4 object-contain" loading="lazy" decoding="async" aria-hidden="true" />
                {app.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
