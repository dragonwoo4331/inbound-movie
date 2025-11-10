import { MoviesService } from '../services/movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    search(searchTerm: string, page?: string): Promise<{
        Search: never[];
        totalResults: number;
        currentPage?: undefined;
        totalPages?: undefined;
    } | {
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
        currentPage: number;
        totalPages: number;
    }>;
    getMovieById(id: string): Promise<{
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
}
