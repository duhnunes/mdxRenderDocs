'use client'

import { useEffect, useState, type JSX } from 'react'
import { Archive, Bird, PackageOpen, Spline } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useVersion } from '@/hooks/use-version'

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
  const { version, setVersion } = useVersion()
  const router = useRouter()

  const [versions, setVersions] = useState<{
    canary: VersionMeta
    active: VersionMeta[]
    archived: VersionMeta[]
  } | null>(null)

  useEffect(() => {
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
      canary: { label: 'canary', icon: 'bird' },
      active: [current, ...active],
      archived,
    })
  }, [])

  function handleSelectVersion(label: string) {
    const targetVersion =
      label === 'canary' ? 'canary' : label.replace('version-', '')
    const pathname = window.location.pathname
    const match = pathname.match(/^\/docs\/([^\/]+)\/([^\/]+)$/)
    const currentFilename = match?.[2] || 'intro'

    setVersion(targetVersion)
    router.push(`/docs/${targetVersion}/${currentFilename}`)
  }

  const getIcon = (label: string | undefined): JSX.Element | null => {
    if (!versions || !label) return null
    const all = [versions.canary, ...versions.active, ...versions.archived]

    const found = all.find((v) => {
      const normalized =
        v.label === 'canary' ? 'canary' : v.label.replace('version-', '')
      return normalized === label
    })

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
        <Button
          variant="outline"
          size="sm"
          className="min-w-[134px] capitalize"
        >
          {version === 'canary'
            ? 'Canary'
            : `Version ${version?.replace('version-', '')}`}
          <DropdownMenuShortcut>{getIcon(version)}</DropdownMenuShortcut>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleSelectVersion(versions.canary.label)}
            className="capitalize"
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
              className="capitalize"
              onClick={() => handleSelectVersion(label)}
            >
              {label.replace('version-', 'version ')}
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
              className="text-primary/60 capitalize"
              onClick={() => handleSelectVersion(label)}
            >
              {label.replace('version-', 'version ')}
              <DropdownMenuShortcut>{getIcon(label)}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
