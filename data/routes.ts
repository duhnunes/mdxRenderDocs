export const APP_ROUTES = {
  // Fundamentals
  intro: '/intro',
  license: '/license',

  // Getting Started
  install: '/installation',
} as const

export type AppRoute = keyof typeof APP_ROUTES

export type AppRoutePath = (typeof APP_ROUTES)[AppRoute]

export const VALID_ROUTES: AppRoutePath[] = Object.values(APP_ROUTES)

export const DEFAULT_ROUTE: AppRoutePath = APP_ROUTES.intro
