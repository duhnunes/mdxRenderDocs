import * as React from 'react'

import { VersionContext } from '@/context/version-docs'

export function useVersion() {
  const ctx = React.useContext(VersionContext)
  if (!ctx) throw new Error('useVersion must be use within VersionProvider')
  return ctx
}
