import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { AppMessages, Language, translations } from '@/i18n/translations'

const LANGUAGE_KEY = 'lilite-language'

interface LanguageContextValue {
  language: Language
  messages: AppMessages
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem(LANGUAGE_KEY)
  return stored === 'fr' ? 'fr' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => readLanguage())

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = () => {
    setLanguage((previous) => (previous === 'en' ? 'fr' : 'en'))
  }

  const messages = useMemo(() => translations[language], [language])

  return <LanguageContext.Provider value={{ language, messages, toggleLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
