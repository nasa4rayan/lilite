import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const { messages } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-10 min-w-10 px-3"
      aria-label={theme === 'light' ? messages.themeToggle.switchToDark : messages.themeToggle.switchToLight}
      onClick={toggleTheme}
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  )
}
