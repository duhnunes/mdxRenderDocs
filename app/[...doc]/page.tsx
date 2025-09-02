import Link from 'next/link'

import { getDocContent } from '@/lib/mdx'
import { Main } from '@/components/layouts/Main'
import { Button } from '@/components/ui/button'
import { getAllDocs } from '@/lib/docs'

export default async function DocPage({
  params,
}: {
  params: Promise<{ doc: string[] }>
}) {
  const { doc } = await params
  const slug = `/${doc.join('/')}`
  const { content } = await getDocContent(doc.join('/'))

  const sidebarLinks = getAllDocs()
  const flatLinks = sidebarLinks.flatMap((category) => category.links)
  const currentIndex = flatLinks.findIndex((link) => link.href === slug)

  const currentLink = flatLinks[currentIndex]
  const currentCategory = sidebarLinks.find((category) =>
    category.links.some((link) => link.href === slug)
  )

  const prevLink = currentIndex > 0 ? flatLinks[currentIndex - 1] : null
  const nextLink =
    currentIndex < flatLinks.length - 1 ? flatLinks[currentIndex + 1] : null

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
        {prevLink ? (
          <Button variant="ghost" size="sm" asChild>
            <Link href={prevLink.href}>{prevLink.label}</Link>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" disabled>
            Anterior
          </Button>
        )}

        {nextLink ? (
          <Button variant="ghost" size="sm" asChild>
            <Link href={nextLink.href}>{nextLink.label}</Link>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" disabled>
            Próxima
          </Button>
        )}
      </footer>
    </section>
  )
}
