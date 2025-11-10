import { FavoritesService } from '../services/favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(req: any): Promise<{
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
    addFavorite(req: any, movieId: string): Promise<import("../entities/favorite.entity").Favorite>;
    removeFavorite(req: any, movieId: string): Promise<{
        message: string;
    }>;
}
