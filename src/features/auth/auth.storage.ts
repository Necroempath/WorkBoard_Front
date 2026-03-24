const ACCESS_TOKEN_KEY = 'access_token'

export const authStorage = {
  set(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },
  get() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  },
}