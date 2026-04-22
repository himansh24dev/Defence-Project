import { useState, useEffect } from 'react'

export function useTheme() {
  const [light, setLight] = useState(() => localStorage.getItem('babayaga_theme') === 'light')

  useEffect(() => {
    if (light) {
      document.documentElement.classList.add('light-mode')
    } else {
      document.documentElement.classList.remove('light-mode')
    }
    localStorage.setItem('babayaga_theme', light ? 'light' : 'dark')
  }, [light])

  return { light, toggle: () => setLight(l => !l) }
}
