import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import LoginPage from './auth/pages/LoginPage'
import RegisterPage from './auth/pages/RegisterPage'
import VerifyEmailPage from './auth/pages/VerifyEmailPage'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import { useAuthStore } from './store/movieStore'
import { authService } from './services/authService'
import { useEffect } from 'react'

function App() {
  const { setUser } = useAuthStore()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      authService.getProfile()
        .then((user) => {
          setUser(user)
        })
        .catch(() => {
          localStorage.removeItem('accessToken')
        })
    }
  }, [setUser])

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App

