import { useState } from 'react'
import { PackageItem } from '@/types'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PackageCardProps {
  pkg: PackageItem
  checked: boolean
  onToggle: (id: string) => void
}

export function PackageCard({ pkg, checked, onToggle }: PackageCardProps) {
  const Icon = pkg.icon
  const [logoLoadFailed, setLogoLoadFailed] = useState(false)
  const useLogo = Boolean(pkg.logoUrl) && !logoLoadFailed

  return (
    <Card
      className={cn(
        'rounded-xl border bg-card/70 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md',
        checked ? 'border-primary/60 bg-primary/5 dark:bg-primary/10' : '',
      )}
    >
      <label htmlFor={pkg.id} className="flex cursor-pointer items-start gap-3">
        <input
          id={pkg.id}
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(pkg.id)}
          className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-ring"
          aria-label={`Select ${pkg.name}`}
        />

        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-background">
          {useLogo ? (
            <img
              src={pkg.logoUrl}
              alt=""
              className="h-4 w-4 object-contain"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
              onError={() => setLogoLoadFailed(true)}
            />
          ) : (
            <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
          )}
        </span>

        <div className="min-w-0 space-y-1">
          <p className="truncate text-sm font-semibold leading-tight tracking-tight">{pkg.name}</p>
          <p className="text-xs leading-relaxed text-muted-foreground">{pkg.description}</p>
        </div>
      </label>
    </Card>
  )
}
