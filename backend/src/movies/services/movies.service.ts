import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MoviesService {
  private readonly omdbApiKey: string;
  private readonly omdbApiUrl = 'https://www.omdbapi.com/';

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private configService: ConfigService,
  ) {
    this.omdbApiKey = this.configService.get('OMDB_API_KEY', '');
  }

  async searchMovies(searchTerm: string, page: number = 1) {
    try {

      const response = await axios.get(this.omdbApiUrl, {
        params: {
          apikey: this.omdbApiKey,
          s: searchTerm,
          type: 'movie',
          page: page,
        },
        timeout: 5000,
      });

      if (response.data.Response === 'False') {
        return { Search: [], totalResults: 0 };
      }

      // 검색 결과를 데이터베이스에 저장
      const movies = await Promise.all(
        (response.data.Search || []).map((movieData: any) =>
          this.saveOrUpdateMovie(movieData),
        ),
      );

      return {
        Search: movies.map((movie) => this.transformMovie(movie)),
        totalResults: response.data.totalResults,
        currentPage: page,
        totalPages: Math.ceil(parseInt(response.data.totalResults || '0', 10) / 10),
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  async getMovieById(imdbID: string) {
    // 먼저 데이터베이스에서 확인
    let movie = await this.movieRepository.findOne({ where: { imdbID } });

    if (!movie) {
      // API 키가 설정되지 않은 경우 에러 발생
      if (!this.omdbApiKey || this.omdbApiKey === 'your-actual-omdb-api-key-here-change-this-in-production') {
        throw new NotFoundException('영화를 찾을 수 없습니다.');
      }

      // 데이터베이스에 없으면 OMDb API에서 가져오기
      try {
        const response = await axios.get(this.omdbApiUrl, {
          params: {
            apikey: this.omdbApiKey,
            i: imdbID,
          },
          timeout: 5000,
        });

        if (response.data.Response === 'False') {
          throw new NotFoundException('영화를 찾을 수 없습니다.');
        }

        movie = await this.saveOrUpdateMovie(response.data);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        console.error('Error fetching movie:', error);
        throw new NotFoundException('영화를 찾을 수 없습니다.');
      }
    }

    // 상세 정보가 부족하면 API에서 다시 가져오기
    if (!movie.plot || !movie.director || !movie.actors) {
      try {
        const response = await axios.get(this.omdbApiUrl, {
          params: {
            apikey: this.omdbApiKey,
            i: imdbID,
          },
          timeout: 5000,
        });

        if (response.data.Response !== 'False') {
          movie = await this.saveOrUpdateMovie(response.data);
        }
      } catch (error) {
        console.error('Error updating movie details:', error);
      }
    }

    return this.transformMovie(movie);
  }

  // getMovies 메서드 제거 - Favorites 모듈에서 처리

  private async findExistingMovie(imdbID: string): Promise<Movie | null> {
    return this.movieRepository.findOne({ where: { imdbID } });
  }

  private async updateExistingMovie(existingMovie: Movie, movieData: any): Promise<Movie> {
    existingMovie.title = movieData.Title;
    existingMovie.year = movieData.Year;
    existingMovie.type = movieData.Type;
    existingMovie.poster = movieData.Poster;
    existingMovie.plot = movieData.Plot;
    existingMovie.director = movieData.Director;
    existingMovie.actors = movieData.Actors;
    existingMovie.imdbRating = movieData.imdbRating;
    existingMovie.rated = movieData.Rated;
    existingMovie.genre = movieData.Genre;
    return this.movieRepository.save(existingMovie);
  }

  private async createNewMovie(movieData: any): Promise<Movie> {
    const movie = this.movieRepository.create({
      imdbID: movieData.imdbID,
      title: movieData.Title,
      year: movieData.Year,
      type: movieData.Type,
      poster: movieData.Poster,
      plot: movieData.Plot,
      director: movieData.Director,
      actors: movieData.Actors,
      imdbRating: movieData.imdbRating,
      rated: movieData.Rated,
      genre: movieData.Genre,
    });
    return this.movieRepository.save(movie);
  }

  private async saveOrUpdateMovie(movieData: any): Promise<Movie> {
    const existingMovie = await this.findExistingMovie(movieData.imdbID);

    if (existingMovie) {
      return this.updateExistingMovie(existingMovie, movieData);
    } else {
      return this.createNewMovie(movieData);
    }
  }

  private transformMovie(movie: Movie) {
    return {
      imdbID: movie.imdbID,
      Title: movie.title,
      Year: movie.year,
      Type: movie.type,
      Poster: movie.poster,
      Plot: movie.plot,
      Director: movie.director,
      Actors: movie.actors,
      imdbRating: movie.imdbRating,
      Rated: movie.rated,
      Genre: movie.genre,
    };
  }
}

