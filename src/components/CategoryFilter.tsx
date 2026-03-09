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
      className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0"
      role="tablist"
      aria-label={messages.common.filterByCategoryAria}
    >
      <Button
        variant={selected === 'All' ? 'default' : 'outline'}
        size="sm"
        className={cn('shrink-0', selected === 'All' ? '' : 'text-muted-foreground')}
        onClick={() => onSelect('All')}
      >
        {messages.common.all}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          size="sm"
          className={cn('shrink-0 rounded-full px-4', selected === category ? '' : 'text-muted-foreground')}
          onClick={() => onSelect(category)}
        >
          {messages.categories[category]}
        </Button>
      ))}
    </div>
  )
}
