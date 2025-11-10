import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ProtectedRoute from './ProtectedRoute'

// Mock the auth service
vi.mock('../services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn(),
  },
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders children when user is authenticated', () => {
    const mockAuthService = require('../services/authService').authService
    mockAuthService.getCurrentUser.mockReturnValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    })

    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('redirects to login when user is not authenticated', () => {
    const mockAuthService = require('../services/authService').authService
    mockAuthService.getCurrentUser.mockReturnValue(null)

    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})