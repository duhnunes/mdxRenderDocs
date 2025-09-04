'use client'

import { Clipboard, ClipboardCheck } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from './button'

interface BlockTextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  children: React.ReactNode
}

function BlockText({ title, children }: BlockTextProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (contentRef.current) {
      const textToCopy = contentRef.current.innerText
      try {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Erro ao copiar:', error)
      }
    }
  }
  return (
    <section className="flex flex-col bg-secondary rounded-sm my-5 overflow-hidden">
      <div className="flex items-center justify-between p-1 border-b border-border">
        <span className="p-2 text-sm text-secondary-foreground cursor-default uppercase font-mono">
          {title}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-secondary-foreground transition-colors duration-300"
          onClick={handleCopy}
        >
          {copied ? (
            <ClipboardCheck className="size-4 text-green-500" />
          ) : (
            <Clipboard className="size-4" />
          )}
        </Button>
      </div>
      <div ref={contentRef} className="py-3 px-4 text-primary">
        {children}
      </div>
    </section>
  )
}

export { BlockText }
