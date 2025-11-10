import { Movie } from './movie'

export interface Favorite {
  id: string
  movie: Movie
  createdAt: string
}