import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async search(@Query('s') searchTerm: string) {
    return this.moviesService.searchMovies(searchTerm);
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.moviesService.getMovieById(id);
  }

  // getMovies 엔드포인트 제거 - Favorites 모듈에서 처리
}

