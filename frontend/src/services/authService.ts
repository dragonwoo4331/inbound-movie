import api from './apiService'
import { RegisterData, LoginData, AuthResponse, ResetPasswordData } from '../shared/types'
import { storage } from '../shared/utils'
import { UI_CONSTANTS } from '../shared/constants'

export const authService = {
  register: async (data: RegisterData): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/register', data)
    return response.data
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    if (response.data.accessToken) {
      storage.set(UI_CONSTANTS.LOCAL_STORAGE_TOKEN_KEY, response.data.accessToken)
    }
    return response.data
  },

  logout: (): void => {
    storage.remove(UI_CONSTANTS.LOCAL_STORAGE_TOKEN_KEY)
  },

  getProfile: async (): Promise<any> => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  verifyEmail: async (token: string): Promise<any> => {
    const response = await api.get('/auth/verify-email', {
      params: { token },
    })
    return response.data
  },

  forgotPassword: async (email: string): Promise<any> => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (data: ResetPasswordData): Promise<any> => {
    const response = await api.post('/auth/reset-password', data)
    return response.data
  },
}

