import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async getFavorites(userId: string) {
    const favorites = await this.favoriteRepository.find({
      where: { userId },
      relations: ['movie'],
    });

    return favorites.map((favorite) => ({
      id: favorite.id,
      movie: {
        imdbID: favorite.movie.imdbID,
        Title: favorite.movie.title,
        Year: favorite.movie.year,
        Type: favorite.movie.type,
        Poster: favorite.movie.poster,
      },
      createdAt: favorite.createdAt,
    }));
  }

  async addFavorite(userId: string, movieId: string) {
    // 영화가 데이터베이스에 있는지 확인
    const movie = await this.movieRepository.findOne({ where: { imdbID: movieId } });

    if (!movie) {
      throw new NotFoundException('영화를 찾을 수 없습니다.');
    }

    // 이미 즐겨찾기에 추가되어 있는지 확인
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { userId, movieId },
    });

    if (existingFavorite) {
      throw new ConflictException('이미 즐겨찾기에 추가된 영화입니다.');
    }

    const favorite = this.favoriteRepository.create({
      userId,
      movieId,
    });

    return this.favoriteRepository.save(favorite);
  }

  async removeFavorite(userId: string, movieId: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: { userId, movieId },
    });

    if (!favorite) {
      throw new NotFoundException('즐겨찾기를 찾을 수 없습니다.');
    }

    await this.favoriteRepository.remove(favorite);
    return { message: '즐겨찾기가 삭제되었습니다.' };
  }
}

