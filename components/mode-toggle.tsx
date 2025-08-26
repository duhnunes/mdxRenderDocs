'use client'

import { SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      <SunMoon className="h-[1.2rem] w-[1.2rem]" />
      <SunMoon className="absolute h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
