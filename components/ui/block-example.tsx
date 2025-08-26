import { Clipboard } from 'lucide-react'

import { Button } from './button'

interface BlockExampleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  children: React.ReactNode
}

function BlockExample({ title, children }: BlockExampleProps) {
  return (
    <section className="flex flex-col bg-primary-foreground rounded-sm my-5 overflow-hidden">
      <div className="flex items-center justify-between p-1 border-b border-border">
        <span className="p-2 text-sm text-zinc-300 cursor-default uppercase font-mono">
          {title}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-input hover:text-primary transition-colors duration-300"
        >
          <Clipboard className="size-4" />
        </Button>
      </div>
      <div className="py-3 px-4 text-zinc-400">{children}</div>
    </section>
  )
}

export { BlockExample }
