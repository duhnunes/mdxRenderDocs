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

const CONTENT_DIR = path.join(process.cwd(), 'app/content')

export function getAllDocs(): DocCategory[] {
  const categories: DocCategory[] = []

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      const categoryTitle = entry.name
      const categoryPath = path.join(CONTENT_DIR, categoryTitle)
      const files = fs.readdirSync(categoryPath)

      const links: DocLink[] = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
          const filePath = path.join(categoryPath, file)
          const raw = fs.readFileSync(filePath, 'utf-8')
          const { data } = matter(raw)

          const slug = `/${categoryTitle}/${file.replace('.mdx', '')}`

          return {
            href: slug,
            label: data.title || file.replace('.mdx', ''),
            description: data.description || '',
          }
        })

      categories.push({ title: categoryTitle, links })
    }
  })

  return categories
}
