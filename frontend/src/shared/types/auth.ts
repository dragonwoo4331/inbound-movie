export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface User {
  id: string
  email: string
  name: string
}

export interface ResetPasswordData {
  token: string
  password: string
}