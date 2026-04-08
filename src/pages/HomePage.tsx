import { useMemo } from 'react'
import { Layers3, Lock, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { FAQSection } from '@/components/FAQSection'
import { SectionHeader } from '@/components/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { useSEO } from '@/hooks/useSEO'
import { getSiteUrl } from '@/lib/site'
import {
  createFAQSchema,
  createSoftwareApplicationSchema,
  createWebSiteSchema,
} from '@/lib/structuredData'

export function HomePage() {
  const { language, messages } = useLanguage()
  const linuxCommunity = [
    { name: 'Arch Linux', logo: 'https://cdn.simpleicons.org/archlinux' },
    { name: 'Debian', logo: 'https://cdn.simpleicons.org/debian' },
    { name: 'Fedora', logo: 'https://cdn.simpleicons.org/fedora' },
    { name: 'Ubuntu', logo: 'https://cdn.simpleicons.org/ubuntu' },
    { name: 'Linux Mint', logo: 'https://cdn.simpleicons.org/linuxmint' },
    { name: 'Kali Linux', logo: 'https://cdn.simpleicons.org/kalilinux' },
    { name: 'Manjaro', logo: 'https://cdn.simpleicons.org/manjaro' },
  ]
  const popularApps = [
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs' },
    { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
    { name: 'Git', logo: 'https://cdn.simpleicons.org/git' },
    { name: 'Firefox', logo: 'https://cdn.simpleicons.org/firefoxbrowser' },
    { name: 'Steam', logo: 'https://cdn.simpleicons.org/steam' },
    { name: 'Krita', logo: 'https://cdn.simpleicons.org/krita' },
    { name: 'VSCodium', logo: 'https://cdn.simpleicons.org/vscodium' },
  ]
  const siteUrl = getSiteUrl()
  const structuredData = useMemo(
    () => [
      createWebSiteSchema(siteUrl),
      createSoftwareApplicationSchema(siteUrl, messages.hero.description, language),
      createFAQSchema(messages.faq.items),
    ],
    [language, messages.faq.items, messages.hero.description, siteUrl],
  )

  useSEO({
    title: messages.home.seoTitle,
    description: messages.hero.description,
    pathname: '/',
    keywords: [
      'linux command builder',
      'linux install command generator',
      'apt install command',
      'pacman install command',
      'dnf install command',
      'linux package builder',
    ],
    structuredData,
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
              <Card key={step.title} className="floating-enter h-full rounded-2xl border bg-card/80 shadow-sm">
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
            <Card className="floating-enter h-full rounded-2xl border bg-card/80 shadow-sm">
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
            <Card className="floating-enter h-full rounded-2xl border bg-card/80 shadow-sm">
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
            <Card className="floating-enter h-full rounded-2xl border bg-card/80 shadow-sm sm:col-span-2 lg:col-span-1">
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

      <section aria-labelledby="linux-community" className="py-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionHeader
            title={messages.home.communitySectionTitle}
            description={messages.home.communitySectionDescription}
            id="linux-community"
          />

          <div className="grid gap-3 lg:grid-cols-2">
            <Card className="floating-enter rounded-2xl border bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <Users className="h-4 w-4 text-primary" />
                  </span>
                  {messages.home.linuxCommunityTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {linuxCommunity.map((item) => (
                    <div key={item.name} className="inline-flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2">
                      <img
                        src={item.logo}
                        alt=""
                        className="h-5 w-5 object-contain"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        aria-hidden="true"
                      />
                      <span className="truncate text-xs font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="floating-enter rounded-2xl border bg-card/80 shadow-sm">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-3 text-base">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/20">
                    <Layers3 className="h-4 w-4 text-primary" />
                  </span>
                  {messages.home.popularAppsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {popularApps.map((item) => (
                    <div key={item.name} className="inline-flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2">
                      <img
                        src={item.logo}
                        alt=""
                        className="h-5 w-5 object-contain"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        aria-hidden="true"
                      />
                      <span className="truncate text-xs font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
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
