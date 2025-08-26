import fs from 'fs'
import path from 'path'

import { compileMDX } from 'next-mdx-remote/rsc'

import { mdxComponents } from '@/components/mdx-components'

import { SLUG_TO_PATH } from './slug-to-path-mdx'

const CONTENT_PATH = path.join(process.cwd(), 'app', 'content')

export async function getDocContent(slug: string) {
  const relativePath = SLUG_TO_PATH[slug]
  if (!relativePath) throw new Error(`Slug não mapeado: ${slug}`)

  const filePath = path.join(CONTENT_PATH, `${relativePath}.mdx`)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo MDX não encontrado: ${filePath}`)
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
