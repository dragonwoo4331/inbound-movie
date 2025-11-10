export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
  imdbRating?: string
  Plot?: string
  Director?: string
  Actors?: string
  Genre?: string
  Rated?: string
}

export interface MovieSearchResponse {
  Search: Movie[]
  totalResults: string
  Response: string
}