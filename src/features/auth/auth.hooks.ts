import { useState } from 'react'
import { login, register } from './auth.api'
import type { LoginParams, RegisterParams } from './auth.api'
import { authStorage } from './auth.storage'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)

  const signIn = async (params: LoginParams) => {
    setLoading(true)
    try {
      const { accessToken } = await login(params)
      authStorage.set(accessToken)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (params: RegisterParams) => {
    setLoading(true)
    try {
      const { accessToken } = await register(params)
      authStorage.set(accessToken)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authStorage.clear()
  }

  return { signIn, signUp, logout, loading }
}