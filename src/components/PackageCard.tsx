import { useEffect, useMemo, useState } from 'react'
import { PackageItem } from '@/types'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

interface PackageCardProps {
  pkg: PackageItem
  checked: boolean
  onToggle: (id: string) => void
}

export function PackageCard({ pkg, checked, onToggle }: PackageCardProps) {
  const Icon = pkg.icon
  const [logoIndex, setLogoIndex] = useState(0)
  const { messages } = useLanguage()
  const logoCandidates = useMemo(() => {
    const normalized = [pkg.packageName, pkg.name]
      .map((value) =>
        value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '')
          .replace(/(desktop|stable|launcher|linux|qt|forlinux|gameslauncher)$/g, ''),
      )
      .filter(Boolean)

    const candidates = [pkg.logoUrl, ...normalized.map((slug) => `https://cdn.simpleicons.org/${slug}`)]
    return Array.from(new Set(candidates.filter(Boolean))) as string[]
  }, [pkg.logoUrl, pkg.name, pkg.packageName])
  const activeLogo = logoCandidates[logoIndex]

  useEffect(() => {
    setLogoIndex(0)
  }, [pkg.id])

  return (
    <Card
      className={cn(
        'rounded-xl border bg-card/70 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md',
        checked ? 'border-primary/60 bg-primary/5 dark:bg-primary/10' : '',
      )}
    >
      <label
        htmlFor={pkg.id}
        className="flex cursor-pointer items-start gap-3 rounded-lg focus-within:ring-2 focus-within:ring-ring/70 focus-within:ring-offset-2 focus-within:ring-offset-background"
      >
        <input
          id={pkg.id}
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(pkg.id)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${messages.common.selectLabelPrefix} ${pkg.name}`}
        />

        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background shadow-sm">
          {activeLogo ? (
            <img
              src={activeLogo}
              alt=""
              className="h-6 w-6 object-contain"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              aria-hidden="true"
              onError={() => setLogoIndex((current) => current + 1)}
            />
          ) : (
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          )}
        </span>

        <div className="min-w-0 space-y-1">
          <p className="truncate text-sm font-semibold leading-tight tracking-tight">{pkg.name}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>
        </div>
      </label>
    </Card>
  )
}
