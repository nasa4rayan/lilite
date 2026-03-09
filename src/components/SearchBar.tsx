import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        aria-label="Search packages"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by app, package, or description"
        className="h-11 rounded-lg bg-card/70 pl-9"
      />
    </div>
  )
}
