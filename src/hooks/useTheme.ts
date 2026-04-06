import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const THEME_KEY = 'lilite-theme'
const DEFAULT_THEME: Theme = 'light'

function readTheme(): Theme {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME
  }

  const stored = window.localStorage.getItem(THEME_KEY)
  return stored === 'dark' ? 'dark' : DEFAULT_THEME
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
