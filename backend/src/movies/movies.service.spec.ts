import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from './services/movies.service';
import { Movie } from './entities/movie.entity';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: Repository<Movie>;
  let configService: ConfigService;

  const mockMovieRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('searchMovies', () => {
    it('should search movies successfully', async () => {
      const mockResponse = {
        data: {
          Response: 'True',
          Search: [
            {
              imdbID: 'tt0111161',
              Title: 'The Shawshank Redemption',
              Year: '1994',
              Type: 'movie',
              Poster: 'poster.jpg',
            },
          ],
          totalResults: '1',
        },
      };

      mockConfigService.get.mockReturnValue('test-api-key');
      mockedAxios.get.mockResolvedValue(mockResponse);
      mockMovieRepository.findOne.mockResolvedValue(null);
      mockMovieRepository.create.mockReturnValue({} as Movie);
      mockMovieRepository.save.mockResolvedValue({
        imdbID: 'tt0111161',
        title: 'The Shawshank Redemption',
        year: '1994',
        type: 'movie',
        poster: 'poster.jpg',
      } as Movie);

      const result = await service.searchMovies('shawshank');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.omdbapi.com/',
        expect.objectContaining({
          params: expect.objectContaining({
            apikey: 'test-api-key',
            s: 'shawshank',
            type: 'movie',
          }),
        })
      );
      expect(result).toHaveProperty('Search');
      expect(result.Search).toHaveLength(1);
    });

    it('should return empty search when API returns false response', async () => {
      const mockResponse = {
        data: {
          Response: 'False',
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);
      mockConfigService.get.mockReturnValue('test-api-key');

      const result = await service.searchMovies('nonexistent');

      expect(result).toEqual({ Search: [], totalResults: 0 });
    });
  });

  describe('getMovieById', () => {
    it('should return movie from database if exists', async () => {
      const mockMovie = {
        imdbID: 'tt0111161',
        title: 'The Shawshank Redemption',
        year: '1994',
        type: 'movie',
        poster: 'poster.jpg',
        plot: 'Test plot',
        director: 'Test Director',
        actors: 'Test Actors',
        imdbRating: '9.3',
        rated: 'R',
        genre: 'Drama',
      };

      mockMovieRepository.findOne.mockResolvedValue(mockMovie);

      const result = await service.getMovieById('tt0111161');

      expect(mockMovieRepository.findOne).toHaveBeenCalledWith({
        where: { imdbID: 'tt0111161' },
      });
      expect(result).toHaveProperty('imdbID', 'tt0111161');
      expect(result).toHaveProperty('Title', 'The Shawshank Redemption');
    });

    it('should fetch from API if movie not in database', async () => {
      const mockApiResponse = {
        data: {
          Response: 'True',
          imdbID: 'tt0111161',
          Title: 'The Shawshank Redemption',
          Year: '1994',
          Type: 'movie',
          Poster: 'poster.jpg',
          Plot: 'Test plot',
          Director: 'Test Director',
          Actors: 'Test Actors',
          imdbRating: '9.3',
          Rated: 'R',
          Genre: 'Drama',
        },
      };

      mockMovieRepository.findOne.mockResolvedValue(null);
      mockedAxios.get.mockResolvedValue(mockApiResponse);
      mockConfigService.get.mockReturnValue('test-api-key');
      mockMovieRepository.create.mockReturnValue({} as Movie);
      mockMovieRepository.save.mockResolvedValue({
        imdbID: 'tt0111161',
        title: 'The Shawshank Redemption',
        year: '1994',
        type: 'movie',
        poster: 'poster.jpg',
        plot: 'Test plot',
        director: 'Test Director',
        actors: 'Test Actors',
        imdbRating: '9.3',
        rated: 'R',
        genre: 'Drama',
      } as Movie);

      const result = await service.getMovieById('tt0111161');

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(result).toHaveProperty('imdbID', 'tt0111161');
    });

    it('should throw NotFoundException if movie not found in API', async () => {
      const mockApiResponse = {
        data: {
          Response: 'False',
        },
      };

      mockMovieRepository.findOne.mockResolvedValue(null);
      mockedAxios.get.mockResolvedValue(mockApiResponse);
      mockConfigService.get.mockReturnValue('test-api-key');

      await expect(service.getMovieById('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });
});