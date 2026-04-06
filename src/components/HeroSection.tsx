import { Link } from 'react-router-dom'
import { CheckCircle2, Copy, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function HeroSection() {
  const { messages } = useLanguage()
  const linuxDistros = [
    { name: 'Arch', logo: 'https://cdn.simpleicons.org/archlinux' },
    { name: 'Debian', logo: 'https://cdn.simpleicons.org/debian' },
    { name: 'Fedora', logo: 'https://cdn.simpleicons.org/fedora' },
    { name: 'Ubuntu', logo: 'https://cdn.simpleicons.org/ubuntu' },
    { name: 'Linux Mint', logo: 'https://cdn.simpleicons.org/linuxmint' },
    { name: 'Kali Linux', logo: 'https://cdn.simpleicons.org/kalilinux' },
    { name: 'Manjaro', logo: 'https://cdn.simpleicons.org/manjaro' },
    { name: 'openSUSE', logo: 'https://cdn.simpleicons.org/opensuse' },
  ]

  return (
    <section className="pb-6 pt-8 sm:pb-10 sm:pt-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/10 px-6 py-7 shadow-sm sm:px-10 sm:py-11 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/20" />

          <div className="relative z-10 flex flex-col gap-5 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{messages.hero.title}</h1>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {messages.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-md border bg-background/80 px-2.5 py-1 backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.manualReview}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border bg-background/80 px-2.5 py-1 backdrop-blur">
                <Copy className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.oneGroupedCommand}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border bg-background/80 px-2.5 py-1 backdrop-blur">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {messages.hero.badges.manualExecution}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1 sm:pt-2">
              {linuxDistros.map((distro) => (
                <span
                  key={distro.name}
                  className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur"
                >
                  <img
                    src={distro.logo}
                    alt=""
                    className="h-4 w-4 object-contain"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    aria-hidden="true"
                  />
                  {distro.name}
                </span>
              ))}
            </div>

            <div className="pt-1 sm:pt-2">
              <Link
                to="/get-started"
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
              >
                {messages.hero.startBuilding}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
