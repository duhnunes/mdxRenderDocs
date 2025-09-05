'use client'

import { useEffect, useState, type JSX } from 'react'
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
import staticVersions from '../../versions.json'

const iconMap = {
  bird: Bird,
  packageOpen: PackageOpen,
  archive: Archive,
}

type VersionMeta = {
  label: string
  icon: keyof typeof iconMap
}

export function DropdownVersion() {
  const [versionSelected, setVersionSelected] = useState<string | undefined>(
    undefined
  )
  const [versions, setVersions] = useState<{
    canary: VersionMeta
    active: VersionMeta[]
    archived: VersionMeta[]
  } | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mdxRenderDoc-selectedVersion')
    const currentLabel = staticVersions[0]
    if (saved) {
      setVersionSelected(saved)
    } else {
      setVersionSelected(currentLabel)
    }

    const inferIcon = (label: string): keyof typeof iconMap => {
      const version = label.replace('version-', '')
      return version < '1.1.2' ? 'archive' : 'packageOpen'
    }

    const parsedVersions = (staticVersions as string[]).map(
      (label): VersionMeta => ({
        label,
        icon: inferIcon(label),
      })
    )

    const current: VersionMeta = parsedVersions[0]
    const rest = parsedVersions.slice(1)

    const active = rest.filter((v) => v.icon === 'packageOpen')
    const archived = rest.filter((v) => v.icon === 'archive')

    setVersions({
      canary: { label: 'Canay', icon: 'bird' },
      active: [current, ...active],
      archived,
    })
  }, [])

  const handleSelectVersion = (version: string) => {
    setVersionSelected(version)
    localStorage.setItem('mdxRenderDoc-selectedVersion', version)
  }

  const getIcon = (label: string | undefined): JSX.Element | null => {
    if (!versions || !label) return null
    const all = [versions.canary, ...versions.active, ...versions.archived]
    const found = all.find((v) => v.label === label)
    const Icon = found ? iconMap[found.icon] : null
    return Icon ? <Icon className="size-4 text-primary" /> : null
  }

  if (!versions) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-[134px] px-9 overflow-hidden"
      >
        <div className="animate-spin flex item-center justify-center">
          <Spline className="size-4" />
        </div>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[134px]">
          {versionSelected}
          <DropdownMenuShortcut>
            {getIcon(versionSelected)}
          </DropdownMenuShortcut>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleSelectVersion(versions.canary.label)}
            aria-label="Version Canary"
          >
            {versions.canary.label}
            <DropdownMenuShortcut>
              {getIcon(versions.canary.label)}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {versions.active.map(({ label }) => (
            <DropdownMenuItem
              key={label}
              onClick={() => handleSelectVersion(label)}
            >
              {label}
              <DropdownMenuShortcut>{getIcon(label)}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center py-px">
            Archived
          </DropdownMenuLabel>
          {versions.archived.map(({ label }) => (
            <DropdownMenuItem
              key={label}
              className="text-primary/60"
              onClick={() => handleSelectVersion(label)}
            >
              {label}
              <DropdownMenuShortcut>{getIcon(label)}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
