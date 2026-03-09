import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'

export function LanguageToggle() {
  const { language, toggleLanguage, messages } = useLanguage()

  return (
    <Button variant="outline" size="sm" aria-label={messages.languageToggle.aria} onClick={toggleLanguage}>
      {language === 'en' ? 'EN' : 'FR'}
    </Button>
  )
}
