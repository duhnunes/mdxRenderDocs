'use client'

import { createContext, useEffect, useState } from 'react'

import staticVersions from '@/versions.json'

type VersionContextType = {
  version: string
  setVersion: (v: string) => void
}

export const VersionContext = createContext<VersionContextType | undefined>(
  undefined
)

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const defaultVersion = staticVersions[0]?.replace('version-', '') || 'canary'
  const [version, setVersion] = useState(defaultVersion)

  useEffect(() => {
    const saved = localStorage.getItem('mdxRenderDocs-selectedVersion')
    if (saved) {
      const clean =
        saved === 'canary' ? 'canary' : saved.replace('version-', '')
      setVersion(clean)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mdxRenderDocs-selectedVersion', version)
  }, [version])

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  )
}
