import { Repository } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';
import { Movie } from '../../movies/entities/movie.entity';
export declare class FavoritesService {
    private favoriteRepository;
    private movieRepository;
    constructor(favoriteRepository: Repository<Favorite>, movieRepository: Repository<Movie>);
    getFavorites(userId: string): Promise<{
        id: string;
        movie: {
            imdbID: string;
            Title: string;
            Year: string;
            Type: string;
            Poster: string;
        };
        createdAt: Date;
    }[]>;
    addFavorite(userId: string, movieId: string): Promise<Favorite>;
    removeFavorite(userId: string, movieId: string): Promise<{
        message: string;
    }>;
}
