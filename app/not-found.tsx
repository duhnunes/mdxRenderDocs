import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getAllDocs } from '@/lib/docs'

export default function NotFound() {
  const fallbackHref = getAllDocs()[0]?.links[0]?.href

  return (
    <section className="bg-transparent text-primary h-full flex items-center justify-center cursor-default">
      <div className="w-1/2 space-y-3">
        <h1 className="text-9xl font-bold font-mono text-center">404</h1>
        <article className="flex flex-col gap-y-5">
          <p className="text-sm text-center">Página não encontrada!</p>
          <Button variant="destructive" size="default" asChild>
            <Link href={fallbackHref}>Voltar para página principal</Link>
          </Button>
        </article>
      </div>
    </section>
  )
}
