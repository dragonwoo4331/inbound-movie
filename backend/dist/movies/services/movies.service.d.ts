import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Movie } from '../entities/movie.entity';
export declare class MoviesService {
    private movieRepository;
    private configService;
    private readonly omdbApiKey;
    private readonly omdbApiUrl;
    constructor(movieRepository: Repository<Movie>, configService: ConfigService);
    searchMovies(searchTerm: string): Promise<{
        Search: {
            imdbID: string;
            Title: string;
            Year: string;
            Type: string;
            Poster: string;
            Plot: string;
            Director: string;
            Actors: string;
            imdbRating: string;
            Rated: string;
            Genre: string;
        }[];
        totalResults: any;
    }>;
    getMovieById(imdbID: string): Promise<{
        imdbID: string;
        Title: string;
        Year: string;
        Type: string;
        Poster: string;
        Plot: string;
        Director: string;
        Actors: string;
        imdbRating: string;
        Rated: string;
        Genre: string;
    }>;
    private findExistingMovie;
    private updateExistingMovie;
    private createNewMovie;
    private saveOrUpdateMovie;
    private transformMovie;
}
