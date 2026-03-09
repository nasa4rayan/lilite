import { Link } from 'react-router-dom'
import { LogoMark } from '@/components/LogoMark'
import { useSEO } from '@/hooks/useSEO'

export function NotFoundPage() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you requested could not be found. Return to Lilite and continue building safe Linux install commands.',
  })

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-20 sm:px-6">
      <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
        <LogoMark className="h-3.5 w-3.5 rounded-sm" alt="Lilite logo" /> 404
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-lg text-muted-foreground">The page you requested does not exist. Return home and continue with Lilite.</p>
      <Link
        to="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to Home
      </Link>
    </main>
  )
}
