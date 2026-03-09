import { Lock, ShieldCheck, Sparkles } from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { FAQSection } from '@/components/FAQSection'
import { SectionHeader } from '@/components/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSEO } from '@/hooks/useSEO'

const steps = [
  {
    title: 'Choose your distro family',
    description: 'Pick Arch-based, Debian-based, or Fedora-based so command syntax is correct from the start.',
  },
  {
    title: 'Find and select packages',
    description: 'Use category filters and search to quickly choose only what you need.',
  },
  {
    title: 'Review one grouped command',
    description: 'The preview updates live and always stays as one install command.',
  },
  {
    title: 'Copy and run manually',
    description: 'You keep full control by running the command yourself in your terminal.',
  },
]

export function HomePage() {
  useSEO({
    title: 'Lilite | Linux Command Builder',
    description:
      'Lilite helps you build one safe Linux install command from official repositories for Arch, Debian, and Fedora families.',
    pathname: '/',
  })

  return (
    <main className="pb-6 sm:pb-8">
      <HeroSection />

      <section aria-labelledby="how-it-works" className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionHeader
            title="How Lilite Works"
            description="A fast four-step flow built for transparency and control."
            id="how-it-works"
          />

          <div className="grid gap-3 md:grid-cols-2">
            {steps.map((step, index) => (
              <Card key={step.title} className="h-full rounded-2xl border bg-card/80 shadow-sm">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-extrabold text-primary ring-1 ring-primary/20 sm:h-11 sm:w-11 sm:text-base">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-semibold tracking-tight text-foreground">{step.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="why-trust" className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionHeader
            title="Why Trust Lilite"
            description="Built to stay minimal, inspectable, and predictable."
            id="why-trust"
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Card className="h-full rounded-2xl border bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <Lock className="h-4 w-4 text-primary" />
                  </span>
                  No Hidden Execution
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                No login, no backend APIs, and no remote command execution.
              </CardContent>
            </Card>
            <Card className="h-full rounded-2xl border bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </span>
                  Full control
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Review, copy, and run commands yourself in your own terminal.
              </CardContent>
            </Card>
            <Card className="h-full rounded-2xl border bg-card/80 shadow-sm sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </span>
                  One clean output
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Package selections are grouped into one clear install command.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <FAQSection />
      </div>
    </main>
  )
}
