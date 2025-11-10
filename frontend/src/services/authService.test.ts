import { vi } from 'vitest'
import { authService } from './authService'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('login', () => {
    it('should login successfully and store token', async () => {
      const mockResponse = {
        data: {
          accessToken: 'mock-jwt-token',
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
          },
        },
      }

      const axios = require('axios').default
      axios.post.mockResolvedValue(mockResponse)

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(axios.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result).toEqual(mockResponse.data)
      expect(localStorage.getItem('token')).toBe('mock-jwt-token')
    })

    it('should handle login failure', async () => {
      const errorMessage = 'Invalid credentials'
      const axios = require('axios').default
      axios.post.mockRejectedValue(new Error(errorMessage))

      await expect(
        authService.login({
          email: 'wrong@example.com',
          password: 'wrongpassword',
        })
      ).rejects.toThrow(errorMessage)
    })
  })

  describe('register', () => {
    it('should register successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Registration successful',
        },
      }

      const axios = require('axios').default
      axios.post.mockResolvedValue(mockResponse)

      const result = await authService.register({
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      })

      expect(axios.post).toHaveBeenCalledWith('/auth/register', {
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      })
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getCurrentUser', () => {
    it('should return user from localStorage token', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }

      // Mock JWT decode
      vi.mock('jwt-decode', () => ({
        default: vi.fn(() => mockUser),
      }))

      localStorage.setItem('token', 'mock-jwt-token')

      const result = authService.getCurrentUser()
      expect(result).toEqual(mockUser)
    })

    it('should return null when no token', () => {
      const result = authService.getCurrentUser()
      expect(result).toBeNull()
    })
  })

  describe('logout', () => {
    it('should clear token from localStorage', () => {
      localStorage.setItem('token', 'mock-jwt-token')
      authService.logout()
      expect(localStorage.getItem('token')).toBeNull()
    })
  })
})