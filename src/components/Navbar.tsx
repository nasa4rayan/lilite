import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { LanguageToggle } from '@/components/LanguageToggle'
import { LogoMark } from '@/components/LogoMark'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useLanguage } from '@/hooks/useLanguage'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { messages } = useLanguage()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
        <Link to="/" className="inline-flex min-w-0 items-center gap-2 text-foreground transition-colors hover:text-primary sm:gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-card shadow-sm sm:h-9 sm:w-9">
            <LogoMark className="h-5 w-5 rounded-md sm:h-6 sm:w-6" />
          </span>
          <p className="truncate text-base font-extrabold tracking-tight">Lilite</p>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://github.com/med6ba/lilite"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            aria-label={messages.navbar.starAria}
            className="group inline-flex h-10 items-center gap-1 rounded-md border border-input bg-background px-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:px-3"
          >
            <Star className="h-4 w-4 text-primary transition-colors group-hover:fill-primary" />
            <span className="hidden sm:inline">{messages.navbar.starOnGitHub}</span>
          </a>
          <LanguageToggle />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  )
}
