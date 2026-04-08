import { Category } from '@/types'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: Category[]
  selected: Category | 'All'
  onSelect: (category: Category | 'All') => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const { messages } = useLanguage()

  return (
    <div
      className="mx-[-2px] flex gap-2 overflow-x-auto px-[2px] pb-1.5 [scrollbar-width:thin] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      role="group"
      aria-label={messages.common.filterByCategoryAria}
    >
      <Button
        type="button"
        variant={selected === 'All' ? 'default' : 'outline'}
        size="sm"
        className={cn('h-10 shrink-0 rounded-full px-4 text-sm', selected === 'All' ? '' : 'text-muted-foreground')}
        aria-pressed={selected === 'All'}
        onClick={() => onSelect('All')}
      >
        {messages.common.all}
      </Button>
      {categories.map((category) => (
        <Button
          type="button"
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          size="sm"
          className={cn('h-10 shrink-0 rounded-full px-4 text-sm', selected === category ? '' : 'text-muted-foreground')}
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
        >
          {messages.categories[category]}
        </Button>
      ))}
    </div>
  )
}
