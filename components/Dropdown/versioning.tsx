'use client'

import { useEffect, useState } from 'react'
import { Archive, Bird, PackageOpen, Spline } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

export function DropdownVersion() {
  const [versionSelected, setVersionSelected] = useState<string | undefined>(
    undefined
  )
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const savedVersion = localStorage.getItem('mdxRenderDoc-selectedVersion')
    if (savedVersion) {
      setVersionSelected(savedVersion)
    }

    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  const handleSelectVersion = (version: string) => {
    setVersionSelected(version)
    localStorage.setItem('mdxRenderDoc-selectedVersion', version)
  }

  const getVersionIcon = (version: string | undefined) => {
    if (!version) return null

    if (version === 'Canary') return <Bird className="size-4 text-primary" />

    if (
      version === 'Version 1.2.7' ||
      version === 'Version 1.1.6' ||
      version === 'Version 1.1.3'
    )
      return <PackageOpen className="size-4 text-primary" />

    return <Archive className="size-4 text-primary" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isMounted ? (
          <Button variant="outline" size="sm" className="w-[134px]">
            {versionSelected}
            <DropdownMenuShortcut>
              {getVersionIcon(versionSelected)}
            </DropdownMenuShortcut>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="px-0 overflow-hidden w-[134px]"
          >
            <div className="animate-spin flex items-center justify-center">
              <Spline className="size-4" />
            </div>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleSelectVersion('Canary')}
            aria-label="Version Canary"
          >
            Canary
            <DropdownMenuShortcut>
              <Bird className="size-4 text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleSelectVersion('Version 1.2.7')}
            aria-label="Version 1.2.7"
          >
            Version 1.2.7
            <DropdownMenuShortcut>
              <PackageOpen className="size-4 text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSelectVersion('Version 1.1.6')}
            aria-label="Version 1.1.6"
          >
            Version 1.1.6
            <DropdownMenuShortcut>
              <PackageOpen className="size-4 text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSelectVersion('Version 1.1.3')}
            aria-label="Version 1.1.3"
          >
            Version 1.1.3
            <DropdownMenuShortcut>
              <PackageOpen className="size-4 text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center py-px">
            Archived
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="text-primary/60"
            onClick={() => handleSelectVersion('Version 1.1.1')}
            aria-label="Version 1.1.1 archived"
          >
            Version 1.1.1
            <DropdownMenuShortcut>
              <Archive className="size-4 text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-primary/60"
            onClick={() => handleSelectVersion('Version 1.1.0')}
            aria-label="Version 1.1.0 archived"
          >
            Version 1.1.0
            <DropdownMenuShortcut>
              <Archive className="size-4 text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-primary/60"
            onClick={() => handleSelectVersion('Version 1.0.0')}
            aria-label="Version 1.0.0 archived"
          >
            Version 1.0.0
            <DropdownMenuShortcut>
              <Archive className="size-4 text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
