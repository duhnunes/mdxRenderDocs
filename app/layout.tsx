import type { Metadata } from 'next'
import { Bebas_Neue, Space_Mono } from 'next/font/google'

import './globals.css'

import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'
import { ThemeProvider } from '@/components/theme-provider'

const bebas = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: '400',
})
const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  icons: {
    icon: '/favicon.ico',
  },
  title: 'mdxRenderDocs',
  description:
    'Uma ferramenta pra ajudar a criar documentações com MDX e NextJS de forma simples e rápida.',
  authors: [{ name: 'DuH Nunes', url: 'https://github.com/duhnunes' }],
  keywords: [
    'duhnunes',
    'mdxRenderDocs',
    'documentation',
    'documento',
    'padrão',
    'pt-br',
    'ptbr',
    'nextjs',
    'mdx',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'mdxRenderDocs',
    description:
      'Uma ferramenta pra ajudar a criar documentações com MDX e NextJS de forma simples e rápida.',
    url: 'https://mdxrenderdocs.vercel.app',
    images: [
      {
        url: '/icons/favicon-96x96.png',
        width: 1200,
        height: 630,
        alt: 'mdxRenderDocs Open Graph Image TEMPORARY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mdxRenderDocs',
    description:
      'Uma ferramenta pra ajudar a criar documentações com MDX e NextJS de forma simples e rápida.',
    images: ['/icons/favicon-96x96.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <head>
        {/* FAVICON */}
        <link
          href="/icons/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link href="/icons/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link
          href="/icons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <meta content="CasualFriendly" name="apple-mobile-web-app-title" />
        <link href="/icons/site.webmanifest" rel="manifest" />

        {/* MOBILE BAR COLOR */}
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`${bebas.variable} ${spaceMono.variable} antialiased`}>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          defaultTheme="dark"
        >
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
