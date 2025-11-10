import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Movie, User } from '../shared/types'
import { storage } from '../shared/utils'
import { UI_CONSTANTS } from '../shared/constants'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

interface MovieStore {
  movies: Movie[]
  favorites: string[]
  setMovies: (movies: Movie[]) => void
  setFavorites: (favorites: string[]) => void
  toggleFavorite: (movieId: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        storage.remove(UI_CONSTANTS.LOCAL_STORAGE_TOKEN_KEY)
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useStore = create<MovieStore>()(
  persist(
    (set) => ({
      movies: [],
      favorites: [],
      setMovies: (movies) => set({ movies }),
      setFavorites: (favorites) => set({ favorites }),
      toggleFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.includes(movieId)
            ? state.favorites.filter((id) => id !== movieId)
            : [...state.favorites, movieId],
        })),
    }),
    {
      name: 'movie-storage',
    }
  )
)
