import { BackButton } from '@/components/BackButton'
import { DistroCard } from '@/components/DistroCard'
import { SectionHeader } from '@/components/SectionHeader'
import archLogo from '@/assets/arch.png'
import debianLogo from '@/assets/debian.png'
import fedoraLogo from '@/assets/fedora.png'
import { useLanguage } from '@/hooks/useLanguage'
import { useSEO } from '@/hooks/useSEO'

export function DistroChooserPage() {
  const { messages } = useLanguage()

  useSEO({
    title: messages.chooserPage.seoTitle,
    description: messages.chooserPage.seoDescription,
    pathname: '/get-started',
  })

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <SectionHeader
        title={messages.chooserPage.title}
        description={messages.chooserPage.description}
        action={<BackButton />}
        as="h1"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <DistroCard
          to="/distro/arch-based"
          title="Arch"
          description={messages.chooserPage.archDescription}
          logoSrc={archLogo}
          logoAlt={messages.chooserPage.archLogoAlt}
        />
        <DistroCard
          to="/distro/fedora-based"
          title="Fedora"
          description={messages.chooserPage.fedoraDescription}
          logoSrc={fedoraLogo}
          logoAlt={messages.chooserPage.fedoraLogoAlt}
        />
        <DistroCard
          to="/distro/debian-based"
          title="Debian"
          description={messages.chooserPage.debianDescription}
          logoSrc={debianLogo}
          logoAlt={messages.chooserPage.debianLogoAlt}
        />
      </div>
    </main>
  )
}
