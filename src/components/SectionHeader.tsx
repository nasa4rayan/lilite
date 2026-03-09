import { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  as?: 'h1' | 'h2'
  id?: string
}

export function SectionHeader({ title, description, action, as = 'h2', id }: SectionHeaderProps) {
  const HeadingTag = as

  return (
    <div className="mb-5">
      {action ? <div className="mb-2">{action}</div> : null}
      <div className="min-w-0">
        <HeadingTag id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </HeadingTag>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p> : null}
      </div>
    </div>
  )
}
