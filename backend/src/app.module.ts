import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { User } from './auth/entities/user.entity';
import { Movie } from './movies/entities/movie.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'movieuser'),
        password: configService.get('DB_PASSWORD', 'moviepass'),
        database: configService.get('DB_NAME', 'movie_app'),
        entities: [User, Movie, Favorite],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
    FavoritesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
