import { Link } from 'react-router-dom'
import { LogoMark } from '@/components/LogoMark'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-card/35">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3 lg:max-w-2xl">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-card shadow-sm">
                <LogoMark className="h-5 w-5 rounded-md" />
              </span>
              <span className="text-base font-extrabold tracking-tight">Lilite</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Lilite is a Linux command builder that helps you generate one grouped install command from official repositories for
              Arch-based, Debian-based, and Fedora-based systems.
            </p>
            <p className="text-xs text-muted-foreground">
              Manual review and execution only. No auto-installation. No external repositories.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:ml-auto">
            <nav aria-label="Footer product links">
              <h2 className="text-sm font-semibold tracking-tight text-foreground">Navigation</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/get-started" className="text-muted-foreground transition-colors hover:text-primary">
                    Distro Chooser
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Footer distro links">
              <h2 className="text-sm font-semibold tracking-tight text-foreground">Distros</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/distro/arch-based" className="text-muted-foreground transition-colors hover:text-primary">
                    Arch
                  </Link>
                </li>
                <li>
                  <Link to="/distro/fedora-based" className="text-muted-foreground transition-colors hover:text-primary">
                    Fedora
                  </Link>
                </li>
                <li>
                  <Link to="/distro/debian-based" className="text-muted-foreground transition-colors hover:text-primary">
                    Debian
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <p className="text-sm text-muted-foreground">© {year} Lilite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
