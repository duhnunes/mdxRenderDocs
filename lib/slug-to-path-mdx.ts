import { sidebarLinks } from '@/data/sidebar-links'

export const SLUG_TO_PATH: Record<string, string> = sidebarLinks.reduce(
  (acc, category) => {
    const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-')
    category.links.forEach((link) => {
      const slug = link.href.replace(/^\//, '')
      acc[slug] = `${categorySlug}/${slug}`
    })
    return acc
  },
  {} as Record<string, string>
)
