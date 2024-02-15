import { DEFAULT_HEADERS } from '@/utils/constants'

const LOGIN_URL = 'https://lingualeo.com/api/auth'

export async function login(email: string, password: string): Promise<string> {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      credentials: {
        email,
        password,
      },
      type: 'mixed',
    }),
  })
  const { accessToken } = await response.json()
  return accessToken
}
