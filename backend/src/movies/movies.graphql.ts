import { ObjectType, Field, ID, Query, Resolver, Args } from '@nestjs/graphql';
import { MoviesService } from './services/movies.service';

@ObjectType()
export class Movie {
  @Field(() => ID)
  imdbID: string;

  @Field()
  Title: string;

  @Field()
  Year: string;

  @Field()
  Type: string;

  @Field({ nullable: true })
  Poster?: string;

  @Field({ nullable: true })
  Plot?: string;

  @Field({ nullable: true })
  Director?: string;

  @Field({ nullable: true })
  Actors?: string;

  @Field({ nullable: true })
  imdbRating?: string;

  @Field({ nullable: true })
  Genre?: string;
}

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => [Movie])
  async movies(@Args('search') search: string): Promise<Movie[]> {
    const result = await this.moviesService.searchMovies(search);
    return result.Search || [];
  }

  @Query(() => Movie, { nullable: true })
  async movie(@Args('id') id: string): Promise<Movie | null> {
    try {
      return await this.moviesService.getMovieById(id);
    } catch {
      return null;
    }
  }
}