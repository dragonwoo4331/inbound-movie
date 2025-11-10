import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { MoviesResolver } from './movies.graphql';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    ConfigModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesResolver],
  exports: [MoviesService],
})
export class MoviesModule {}

