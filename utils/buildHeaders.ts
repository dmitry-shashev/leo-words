import { DEFAULT_HEADERS } from '@/utils/constants'

export function buildHeaders(accessToken: string): Record<string, string> {
  return {
    ...DEFAULT_HEADERS,
    Cookie: `remember=${accessToken}`,
  }
}
