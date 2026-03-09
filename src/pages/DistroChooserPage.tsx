import { BackButton } from '@/components/BackButton'
import { DistroCard } from '@/components/DistroCard'
import { SectionHeader } from '@/components/SectionHeader'
import archLogo from '@/assets/arch.png'
import debianLogo from '@/assets/debian.png'
import fedoraLogo from '@/assets/fedora.png'
import { useSEO } from '@/hooks/useSEO'

export function DistroChooserPage() {
  useSEO({
    title: 'Choose Distro Family',
    description:
      'Select Arch, Fedora, or Debian family to build one grouped Linux install command with official repository package names.',
    pathname: '/get-started',
  })

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <SectionHeader
        title="Choose Your Distro Family"
        description="Pick your distro family to generate package commands with the correct package manager and package names."
        action={<BackButton />}
        as="h1"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <DistroCard
          to="/distro/arch-based"
          title="Arch"
          description="Pacman workflow for Arch Linux and related distributions."
          logoSrc={archLogo}
          logoAlt="Arch Linux logo"
        />
        <DistroCard
          to="/distro/fedora-based"
          title="Fedora"
          description="DNF workflow for Fedora and Fedora-like RPM systems."
          logoSrc={fedoraLogo}
          logoAlt="Fedora logo"
        />
        <DistroCard
          to="/distro/debian-based"
          title="Debian"
          description="Apt workflow for Debian, Ubuntu, and Debian derivatives."
          logoSrc={debianLogo}
          logoAlt="Debian logo"
        />
      </div>
    </main>
  )
}
