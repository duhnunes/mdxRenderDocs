'use client'

import { useEffect, useState } from 'react'
import { Archive, Bird, PackageOpen, Spline } from 'lucide-react'

import { versions } from '../../data/versions'
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

const iconMap = {
  bird: Bird,
  packageOpen: PackageOpen,
  archive: Archive,
}

export function DropdownVersion() {
  const [versionSelected, setVersionSelected] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    const savedVersion = localStorage.getItem('mdxRenderDoc-selectedVersion')
    if (savedVersion) {
      setVersionSelected(savedVersion)
    }
  }, [])

  const handleSelectVersion = (version: string) => {
    setVersionSelected(version)
    localStorage.setItem('mdxRenderDoc-selectedVersion', version)
  }

  const getSelectedIconKey = (
    version: string | undefined
  ): keyof typeof iconMap | undefined => {
    if (!version) return undefined

    if (version === versions.canary.label)
      return versions.canary.icon as keyof typeof iconMap

    const allVersions = [...versions.active, ...versions.archived]
    const found = allVersions.find((v) => v.label === version)

    return found?.icon as keyof typeof iconMap
  }
  const iconKey = getSelectedIconKey(versionSelected)
  const IconComponent = iconKey ? iconMap[iconKey] : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {versionSelected ? (
          <Button variant="outline" size="sm" className="w-[134px]">
            {versionSelected}
            <DropdownMenuShortcut>
              {IconComponent && (
                <IconComponent className="size-4 text-primary" />
              )}
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
            onClick={() => handleSelectVersion(versions.canary.label)}
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
          {versions.active.map(({ label }) => {
            return (
              <DropdownMenuItem
                key={label}
                onClick={() => handleSelectVersion(label)}
              >
                {label}
                <DropdownMenuShortcut>
                  {IconComponent && (
                    <IconComponent className="size-4 text-primary" />
                  )}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center py-px">
            Archived
          </DropdownMenuLabel>
          {versions.archived.map(({ label }) => {
            return (
              <DropdownMenuItem
                key={label}
                className="text-primary/60"
                onClick={() => handleSelectVersion(label)}
              >
                {label}
                <DropdownMenuShortcut>
                  {IconComponent && (
                    <IconComponent className="size-4 text-primary" />
                  )}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
