import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DistroCardProps {
  to: string
  title: string
  description: string
  logoSrc: string
  logoAlt: string
  manager: string
}

export function DistroCard({ to, title, description, logoSrc, logoAlt, manager }: DistroCardProps) {
  const { messages } = useLanguage()
  const [logoLoadFailed, setLogoLoadFailed] = useState(false)
  const shortTitle = useMemo(() => title.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase(), [title])

  return (
    <Link
      to={to}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full rounded-2xl border bg-card/80 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/45 group-hover:shadow-md">
        <CardHeader className="p-4 sm:p-5">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-secondary/60 p-2 shadow-sm">
            {logoLoadFailed ? (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/25 to-emerald-300/30 text-xs font-bold text-foreground">
                {shortTitle}
              </span>
            ) : (
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-8 w-8 object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setLogoLoadFailed(true)}
              />
            )}
          </div>
          <div className="mb-1 inline-flex w-fit items-center rounded-full border bg-background/90 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {manager}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="inline-flex items-center gap-1 p-4 pt-0 text-sm font-medium text-primary sm:p-5 sm:pt-0">
          {messages.common.openPackageBuilder}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </Link>
  )
}
