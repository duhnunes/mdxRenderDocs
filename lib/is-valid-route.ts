import { VALID_ROUTES } from '@/data/routes'

export function isValidRoute(
  path: string
): path is (typeof VALID_ROUTES)[number] {
  return VALID_ROUTES.includes(path as any)
}
