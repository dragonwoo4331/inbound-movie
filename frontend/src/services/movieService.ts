import api from './apiService'
import { Movie, MovieSearchResponse } from '../shared/types'
import { TOP_RATED_MOVIES } from '../shared/constants'

export const searchMovies = async (query: string): Promise<MovieSearchResponse> => {
  const response = await api.get<MovieSearchResponse>('/movies/search', {
    params: { s: query },
  })
  return response.data
}

export const getMovieById = async (imdbID: string): Promise<Movie> => {
  const response = await api.get<Movie>(`/movies/${imdbID}`)
  return response.data
}

export const getTopRatedMovies = async (limit = 12): Promise<Movie[]> => {
  return TOP_RATED_MOVIES.slice(0, limit)
}

