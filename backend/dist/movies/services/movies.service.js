"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("@nestjs/config");
const movie_entity_1 = require("../entities/movie.entity");
let MoviesService = class MoviesService {
    movieRepository;
    configService;
    omdbApiKey;
    omdbApiUrl = 'https://www.omdbapi.com/';
    constructor(movieRepository, configService) {
        this.movieRepository = movieRepository;
        this.configService = configService;
        this.omdbApiKey = this.configService.get('OMDB_API_KEY', '');
    }
    async searchMovies(searchTerm) {
        try {
            const response = await axios_1.default.get(this.omdbApiUrl, {
                params: {
                    apikey: this.omdbApiKey,
                    s: searchTerm,
                    type: 'movie',
                },
                timeout: 5000,
            });
            if (response.data.Response === 'False') {
                return { Search: [], totalResults: 0 };
            }
            const movies = await Promise.all((response.data.Search || []).map((movieData) => this.saveOrUpdateMovie(movieData)));
            return {
                Search: movies.map((movie) => this.transformMovie(movie)),
                totalResults: response.data.totalResults,
            };
        }
        catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }
    async getMovieById(imdbID) {
        let movie = await this.movieRepository.findOne({ where: { imdbID } });
        if (!movie) {
            if (!this.omdbApiKey || this.omdbApiKey === 'your-actual-omdb-api-key-here-change-this-in-production') {
                throw new common_1.NotFoundException('영화를 찾을 수 없습니다.');
            }
            try {
                const response = await axios_1.default.get(this.omdbApiUrl, {
                    params: {
                        apikey: this.omdbApiKey,
                        i: imdbID,
                    },
                    timeout: 5000,
                });
                if (response.data.Response === 'False') {
                    throw new common_1.NotFoundException('영화를 찾을 수 없습니다.');
                }
                movie = await this.saveOrUpdateMovie(response.data);
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException) {
                    throw error;
                }
                console.error('Error fetching movie:', error);
                throw new common_1.NotFoundException('영화를 찾을 수 없습니다.');
            }
        }
        if (!movie.plot || !movie.director || !movie.actors) {
            try {
                const response = await axios_1.default.get(this.omdbApiUrl, {
                    params: {
                        apikey: this.omdbApiKey,
                        i: imdbID,
                    },
                    timeout: 5000,
                });
                if (response.data.Response !== 'False') {
                    movie = await this.saveOrUpdateMovie(response.data);
                }
            }
            catch (error) {
                console.error('Error updating movie details:', error);
            }
        }
        return this.transformMovie(movie);
    }
    async findExistingMovie(imdbID) {
        return this.movieRepository.findOne({ where: { imdbID } });
    }
    async updateExistingMovie(existingMovie, movieData) {
        existingMovie.title = movieData.Title;
        existingMovie.year = movieData.Year;
        existingMovie.type = movieData.Type;
        existingMovie.poster = movieData.Poster;
        existingMovie.plot = movieData.Plot;
        existingMovie.director = movieData.Director;
        existingMovie.actors = movieData.Actors;
        existingMovie.imdbRating = movieData.imdbRating;
        existingMovie.rated = movieData.Rated;
        existingMovie.genre = movieData.Genre;
        return this.movieRepository.save(existingMovie);
    }
    async createNewMovie(movieData) {
        const movie = this.movieRepository.create({
            imdbID: movieData.imdbID,
            title: movieData.Title,
            year: movieData.Year,
            type: movieData.Type,
            poster: movieData.Poster,
            plot: movieData.Plot,
            director: movieData.Director,
            actors: movieData.Actors,
            imdbRating: movieData.imdbRating,
            rated: movieData.Rated,
            genre: movieData.Genre,
        });
        return this.movieRepository.save(movie);
    }
    async saveOrUpdateMovie(movieData) {
        const existingMovie = await this.findExistingMovie(movieData.imdbID);
        if (existingMovie) {
            return this.updateExistingMovie(existingMovie, movieData);
        }
        else {
            return this.createNewMovie(movieData);
        }
    }
    transformMovie(movie) {
        return {
            imdbID: movie.imdbID,
            Title: movie.title,
            Year: movie.year,
            Type: movie.type,
            Poster: movie.poster,
            Plot: movie.plot,
            Director: movie.director,
            Actors: movie.actors,
            imdbRating: movie.imdbRating,
            Rated: movie.rated,
            Genre: movie.genre,
        };
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map