import { api } from '../../shared/api/api'

export type LoginParams = { email: string; password: string }
export type RegisterParams = { name: string; email: string; password: string; confirmPassword: string }
export type LoginResponse = { accessToken: string; refreshToken: string; userId: string; email: string }

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('Auth/login', params)
  return response.data
}

export const register = async (params: RegisterParams) => {
  const res = await api.post<LoginResponse>('Auth/register', params)
  return res.data
}

export const refresh = async (): Promise<string> => {
  const response = await api.post('Auth/refresh')
  return response.data
}
