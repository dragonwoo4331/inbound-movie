import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Movie } from '../movies/entities/movie.entity';
import { FavoritesController } from './controllers/favorites.controller';
import { FavoritesService } from './services/favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, Movie]),
    MoviesModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtAuthGuard],
  exports: [FavoritesService],
})
export class FavoritesModule {}

