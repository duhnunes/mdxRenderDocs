import { notFound } from 'next/navigation'

import { getDocContent } from '@/lib/mdx'
import { Main } from '@/components/layouts/Main'
import { isValidRoute } from '@/lib/is-valid-route'
import { sidebarLinks } from '@/data/sidebar-links'
import { Button } from '@/components/ui/button'

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
    <section className="w-full h-full overflow-y-auto px-7 flex flex-col gap-5 justify-evenly">
      <div className="bg-background w-full h-12 fixed top-[52px] left-0 md:hidden" />
      <div className="w-full flex flex-col gap-5 md:mx-auto md:max-w-[860px] pt-14 md:pt-0">
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
      </div>
      <footer className="flex items-center justify-between">
        <Button variant="ghost" size="sm">
          Anterior
        </Button>
        <Button variant="ghost" size="sm">
          Próxima
        </Button>
      </footer>
    </section>
  )
}
