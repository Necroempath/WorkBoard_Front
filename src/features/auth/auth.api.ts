import { api } from '../../shared/api/api'

export type LoginParams = { email: string; password: string }
export type RegisterParams = { name: string; email: string; password: string; confirmPassword: string }
export type LoginResponse = { accessToken: string; refreshToken: string; id: string; name: string; email: string; roles: string[] }

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('auth/login', params)
  return response.data
}

export const register = async (params: RegisterParams) => {
  const res = await api.post<LoginResponse>('auth/register', params)
  return res.data
}

export const refresh = async (): Promise<string> => {
  const response = await api.post('auth/refresh')
  return response.data
}
