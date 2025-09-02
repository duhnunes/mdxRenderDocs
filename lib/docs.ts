import fs from 'fs'
import path from 'node:path'

import matter from 'gray-matter'

export type DocLink = {
  href: string
  label: string
  description?: string
}

export type DocCategory = {
  title: string
  links: DocLink[]
}

const CONTENT_DIR = path.join(process.cwd(), 'app/docs')

export function getAllDocs(): DocCategory[] {
  const categories: (DocCategory & { position: number })[] = []

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      const categoryPath = path.join(CONTENT_DIR, entry.name)
      const categoryMetaPath = path.join(categoryPath, '_category.json')

      let categoryTitle = entry.name
      let categoryPosition = 999

      if (fs.existsSync(categoryMetaPath)) {
        try {
          const rawMeta = fs.readFileSync(categoryMetaPath, 'utf-8')
          const meta = JSON.parse(rawMeta)
          categoryTitle = meta.title || categoryTitle
          categoryPosition = meta.sidebar_position ?? categoryPosition
        } catch (err) {
          console.warn(`Erro ao ler _category.json em ${entry.name}:`, err)
        }
      }

      const files = fs.readdirSync(categoryPath)

      const links: DocLink[] = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
          const filePath = path.join(categoryPath, file)
          const raw = fs.readFileSync(filePath, 'utf-8')
          const { data } = matter(raw)

          const slug = `/${entry.name}/${file.replace('.mdx', '')}`

          return {
            href: slug,
            label: data.title || file.replace('.mdx', ''),
            description: data.description || '',
            position: data.link_position ?? 1,
          }
        })
        .sort((a, b) => a.position - b.position)
        .map(({ position: _position, ...link }) => link)

      categories.push({
        title: categoryTitle,
        links,
        position: categoryPosition,
      })
    }
  })

  return categories
    .sort((a, b) => a.position - b.position)
    .map(({ position: _position, ...category }) => category)
}
