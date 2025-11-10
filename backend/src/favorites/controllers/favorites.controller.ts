import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(@Request() req) {
    return this.favoritesService.getFavorites(req.user.id);
  }

  @Post(':movieId')
  async addFavorite(@Request() req, @Param('movieId') movieId: string) {
    return this.favoritesService.addFavorite(req.user.id, movieId);
  }

  @Delete(':movieId')
  async removeFavorite(@Request() req, @Param('movieId') movieId: string) {
    return this.favoritesService.removeFavorite(req.user.id, movieId);
  }
}

