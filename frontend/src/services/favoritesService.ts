import api from './apiService'
import { Favorite } from '../shared/types'

export const favoritesService = {
  getFavorites: async (): Promise<Favorite[]> => {
    const response = await api.get<Favorite[]>('/favorites')
    return response.data
  },

  addFavorite: async (movieId: string): Promise<any> => {
    const response = await api.post(`/favorites/${movieId}`)
    return response.data
  },

  removeFavorite: async (movieId: string): Promise<any> => {
    const response = await api.delete(`/favorites/${movieId}`)
    return response.data
  },
}

