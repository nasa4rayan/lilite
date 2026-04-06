import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'

export function LanguageToggle() {
  const { language, toggleLanguage, messages } = useLanguage()

  return (
    <Button variant="outline" size="sm" className="h-10 min-w-10 px-3" aria-label={messages.languageToggle.aria} onClick={toggleLanguage}>
      {language === 'en' ? 'FR' : 'EN'}
    </Button>
  )
}
