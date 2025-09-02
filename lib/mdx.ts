import fs from 'fs'
import path from 'node:path'

import { compileMDX } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

import { mdxComponents } from '@/components/mdx-components'

const CONTENT_PATH = path.join(process.cwd(), 'app', 'content')

export async function getDocContent(slug: string) {
  const [category, filename] = slug.split('/')

  if (!category || !filename) {
    console.log(`Slug acessado: ${slug}`)
    notFound()
  }

  const filePath = path.join(CONTENT_PATH, category, `${filename}.mdx`)
  if (!fs.existsSync(filePath)) {
    console.log(`Arquivo MDX não encontrado: ${filePath}`)
    notFound()
  }

  const source = fs.readFileSync(filePath, 'utf8')

  const { content, frontmatter } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  })

  return { content, frontmatter }
}
