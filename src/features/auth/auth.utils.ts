import { refresh } from '../auth/auth.api'
import { authStorage } from './auth.storage'

export const tryRefresh = async () => {
  try {
    const accessToken = await refresh()
    authStorage.set(accessToken)
    return true
  } catch {
    authStorage.clear()
    return false
  }
}