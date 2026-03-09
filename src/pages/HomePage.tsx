import { Lock, ShieldCheck, Sparkles } from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { FAQSection } from '@/components/FAQSection'
import { SectionHeader } from '@/components/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { useSEO } from '@/hooks/useSEO'

export function HomePage() {
  const { messages } = useLanguage()

  useSEO({
    title: messages.home.seoTitle,
    description: messages.hero.description,
    pathname: '/',
  })

  return (
    <main className="pb-6 sm:pb-8">
      <HeroSection />

      <section aria-labelledby="how-it-works" className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionHeader
            title={messages.home.howItWorksTitle}
            description={messages.home.howItWorksDescription}
            id="how-it-works"
          />

          <div className="grid gap-3 md:grid-cols-2">
            {messages.home.steps.map((step, index) => (
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
            title={messages.home.whyTrustTitle}
            description={messages.home.whyTrustDescription}
            id="why-trust"
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Card className="h-full rounded-2xl border bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <Lock className="h-4 w-4 text-primary" />
                  </span>
                  {messages.home.trustCards.noHiddenExecutionTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {messages.home.trustCards.noHiddenExecutionBody}
              </CardContent>
            </Card>
            <Card className="h-full rounded-2xl border bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </span>
                  {messages.home.trustCards.fullControlTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {messages.home.trustCards.fullControlBody}
              </CardContent>
            </Card>
            <Card className="h-full rounded-2xl border bg-card/80 shadow-sm sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </span>
                  {messages.home.trustCards.oneCleanOutputTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {messages.home.trustCards.oneCleanOutputBody}
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
