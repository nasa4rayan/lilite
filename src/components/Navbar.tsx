import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { LogoMark } from '@/components/LogoMark'
import { ThemeToggle } from '@/components/ThemeToggle'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary sm:gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-card shadow-sm sm:h-9 sm:w-9">
            <LogoMark className="h-5 w-5 rounded-md sm:h-6 sm:w-6" />
          </span>
          <p className="text-base font-extrabold tracking-tight">Lilite</p>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/med6ba/lilite"
            target="_blank"
            rel="noreferrer"
            aria-label="Star Lilite on GitHub"
            className="group inline-flex h-9 items-center gap-1 rounded-md border border-input bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Star className="h-4 w-4 text-primary transition-colors group-hover:fill-primary" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  )
}
