import { Github } from 'lucide-react'

import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'
import { Separator } from '../ui/separator'
import { DropdownVersion } from '../Dropdown/versioning'

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-2 border-b border-border">
      <Button size="icon" variant="ghost">
        <Logo className="size-5" />
      </Button>
      <div className="flex items-center gap-x-2 h-4">
        <DropdownVersion />
        <ModeToggle />
        <Separator orientation="vertical" />
        <Button asChild size="icon" title="GitHub" variant="ghost">
          <a
            className="cursor-default"
            href="https://github.com/duhnunes"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  )
}
