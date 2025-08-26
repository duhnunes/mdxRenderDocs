import { APP_ROUTES } from './routes'

export type LinkItem = {
  href: string
  label: string
  description?: string
}

export type LinkCategory = {
  title: string
  links: LinkItem[]
}

export const sidebarLinks: LinkCategory[] = [
  {
    title: 'Fundamentals',
    links: [
      {
        href: APP_ROUTES.intro,
        label: 'Introdução',
        description:
          'mdxRenderDocs é uma ferramenta que ajuda a criar documentação técnica de forma simples e eficiente.',
      },
      {
        href: APP_ROUTES.license,
        label: 'Licença de Uso',
        description: 'MIT - Uso livre para projetos pessoais e comerciais.',
      },
    ],
  },
  {
    title: 'getting-started',
    links: [
      {
        href: APP_ROUTES.install,
        label: 'Instalação',
        description: 'Instalação e explicação rápida de uso.',
      },
    ],
  },
]
