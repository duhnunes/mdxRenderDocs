import Link from 'next/link'
import { SidebarClose } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { sidebarLinks } from '@/data/sidebar-links'

export function MobileSidebar({
  pathname,
  isOpen,
  onClose,
}: {
  pathname: string
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <section className="fixed top-0 left-0 w-full h-full p-4 border-r border-border z-50 bg-background overflow-y-auto">
      <div className="fixed top-2 right-5">
        <Button variant="ghost" onClick={onClose}>
          <SidebarClose className="size-4" />
        </Button>
      </div>

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
              onClick={onClose}
            >
              <Link className="text-sm text-primary" href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}

          {index < sidebarLinks.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </section>
  )
}
