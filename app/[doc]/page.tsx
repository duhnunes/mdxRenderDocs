import { notFound } from 'next/navigation'

import { getDocContent } from '@/lib/mdx'
import { Main } from '@/components/layouts/Main'
import { isValidRoute } from '@/lib/is-valid-route'
import { sidebarLinks } from '@/data/sidebar-links'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function DocPage({
  params,
}: {
  params: Promise<{ doc: string }>
}) {
  const { doc } = await params
  const slug = `/${doc}`
  const { content } = await getDocContent(doc)

  if (!isValidRoute(slug)) {
    notFound()
  }

  const currentCategory = sidebarLinks.find((category) =>
    category.links.some((link) => link.href === slug)
  )

  const currentLink = currentCategory?.links.find((link) => link.href === slug)

  return (
    <ScrollArea className="flex flex-col w-full mx-auto md:mx-10 px-5">
      <div className="bg-background w-full h-12 fixed top-12 left-0 md:hidden" />
      <div className="h-full w-full flex-1 mx-auto max-w-[860px] pt-5 my-10">
        <header className="mb-6">
          <span className="text-xs text-zinc-700 font-semibold uppercase block -mb-0.5">
            {currentCategory?.title}
          </span>
          <h1 className="text-4xl uppercase font-bold mb-2">
            {currentLink?.label}
          </h1>
          <p className="text-sm text-ring max-w-[726px]">
            {currentLink?.description || 'Sem descrição disponível.'}
          </p>
        </header>
        <Main>{content}</Main>
        <footer className="flex items-center justify-between mt-26 self-end">
          <Button variant="ghost" size="sm">
            Anterior
          </Button>
          <Button variant="ghost" size="sm">
            Próxima
          </Button>
        </footer>
      </div>
    </ScrollArea>
  )
}
