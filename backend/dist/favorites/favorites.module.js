"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const favorite_entity_1 = require("./entities/favorite.entity");
const movie_entity_1 = require("../movies/entities/movie.entity");
const favorites_controller_1 = require("./controllers/favorites.controller");
const favorites_service_1 = require("./services/favorites.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const movies_module_1 = require("../movies/movies.module");
let FavoritesModule = class FavoritesModule {
};
exports.FavoritesModule = FavoritesModule;
exports.FavoritesModule = FavoritesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([favorite_entity_1.Favorite, movie_entity_1.Movie]),
            movies_module_1.MoviesModule,
        ],
        controllers: [favorites_controller_1.FavoritesController],
        providers: [favorites_service_1.FavoritesService, jwt_auth_guard_1.JwtAuthGuard],
        exports: [favorites_service_1.FavoritesService],
    })
], FavoritesModule);
//# sourceMappingURL=favorites.module.js.map