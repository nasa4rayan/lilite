import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DistroCardProps {
  to: string
  title: string
  description: string
  logoSrc: string
  logoAlt: string
}

export function DistroCard({ to, title, description, logoSrc, logoAlt }: DistroCardProps) {
  return (
    <Link to={to} className="group block">
      <Card className="h-full rounded-2xl border bg-card/80 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/45 group-hover:shadow-md">
        <CardHeader className="p-4 sm:p-5">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-secondary/60 p-2">
            <img src={logoSrc} alt={logoAlt} className="h-8 w-8 object-contain" loading="lazy" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="inline-flex items-center gap-1 p-4 pt-0 text-sm font-medium text-primary sm:p-5 sm:pt-0">
          Open package builder
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </Link>
  )
}
