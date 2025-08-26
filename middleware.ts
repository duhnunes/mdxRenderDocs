import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { VALID_ROUTES, DEFAULT_ROUTE, type AppRoutePath } from './data/routes'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Path list ignored
  const IGNORED_PATHS = [
    '/_next/',
    '/favicon.ico',
    '/icons/',
    '/site.webmanifest',
    '/api/',
    '/images/',
    '/fonts/',
    /\.(svg|png|jpg|jpeg|webp|css|js|woff2)$/i,
  ]

  // Verify Ignored Paths
  const shouldIgnore = IGNORED_PATHS.some((pattern) => {
    if (typeof pattern === 'string') {
      return pathname.startsWith(pattern)
    }
    return pattern.test(pathname)
  })

  // If path not in skip list and not in route list
  if (!shouldIgnore && !VALID_ROUTES.includes(pathname as AppRoutePath)) {
    console.log(
      `🔴 Redirecionando rota inválida: ${pathname} → ${DEFAULT_ROUTE}`
    )
    return NextResponse.redirect(new URL(DEFAULT_ROUTE, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Match all paths except those in ignore list
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|api|images|fonts|.*\\..*).*)',
  ],
}
