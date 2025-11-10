import { vi } from 'vitest'
import { searchMovies, getMovieById, getTopRatedMovies } from './movieService'

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

describe('movieService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      const mockResponse = {
        data: {
          Search: [
            {
              imdbID: 'tt0111161',
              Title: 'The Shawshank Redemption',
              Year: '1994',
              Type: 'movie',
              Poster: 'poster.jpg',
            },
          ],
          totalResults: '1',
          currentPage: 1,
          totalPages: 1,
        },
      }

      const axios = require('axios').default
      axios.get.mockResolvedValue(mockResponse)

      const result = await searchMovies('shawshank')

      expect(axios.get).toHaveBeenCalledWith('/movies/search', {
        params: { s: 'shawshank', page: 1 },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should search movies with custom page', async () => {
      const mockResponse = {
        data: {
          Search: [],
          totalResults: '0',
          currentPage: 2,
          totalPages: 0,
        },
      }

      const axios = require('axios').default
      axios.get.mockResolvedValue(mockResponse)

      const result = await searchMovies('nonexistent', 2)

      expect(axios.get).toHaveBeenCalledWith('/movies/search', {
        params: { s: 'nonexistent', page: 2 },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle search failure', async () => {
      const errorMessage = 'Network error'
      const axios = require('axios').default
      axios.get.mockRejectedValue(new Error(errorMessage))

      await expect(searchMovies('test')).rejects.toThrow(errorMessage)
    })
  })

  describe('getMovieById', () => {
    it('should get movie by ID successfully', async () => {
      const mockMovie = {
        imdbID: 'tt0111161',
        Title: 'The Shawshank Redemption',
        Year: '1994',
        Type: 'movie',
        Poster: 'poster.jpg',
        Plot: 'Test plot',
        Director: 'Test Director',
        Actors: 'Test Actors',
        imdbRating: '9.3',
      }

      const axios = require('axios').default
      axios.get.mockResolvedValue({ data: mockMovie })

      const result = await getMovieById('tt0111161')

      expect(axios.get).toHaveBeenCalledWith('/movies/tt0111161')
      expect(result).toEqual(mockMovie)
    })

    it('should handle get movie failure', async () => {
      const errorMessage = 'Movie not found'
      const axios = require('axios').default
      axios.get.mockRejectedValue(new Error(errorMessage))

      await expect(getMovieById('invalid')).rejects.toThrow(errorMessage)
    })
  })

  describe('getTopRatedMovies', () => {
    it('should return top rated movies from constants', async () => {
      const result = await getTopRatedMovies(5)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeLessThanOrEqual(5)
    })

    it('should return default limit when no limit provided', async () => {
      const result = await getTopRatedMovies()
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeLessThanOrEqual(12) // Default limit
    })
  })
})