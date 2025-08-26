'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sidebarLinks } from '@/data/sidebar-links'

import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="h-full">
      <ScrollArea className="w-[256px] h-full p-4 pt-0 border-r border-border relative">
        {sidebarLinks.map((category, index) => (
          <div key={category.title} className="flex flex-col gap-0.5 mb-3 mt-4">
            <p className="text-xs text-ring font-semibold uppercase mb-1">
              {category.title}
            </p>
            {category.links.map((link) => (
              <Button
                key={link.href}
                asChild
                active={pathname.startsWith(link.href)}
                className="justify-start"
                size="sm"
                variant="ghost"
              >
                <Link className="text-sm text-primary" href={link.href}>
                  {link.label}
                </Link>
              </Button>
            ))}

            {index < sidebarLinks.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </ScrollArea>
    </aside>
  )
}
