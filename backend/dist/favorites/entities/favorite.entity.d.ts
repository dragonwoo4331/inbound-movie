import { User } from '../../auth/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';
export declare class Favorite {
    id: string;
    user: User;
    userId: string;
    movie: Movie;
    movieId: string;
    createdAt: Date;
}
