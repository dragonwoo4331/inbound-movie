import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryColumn({ type: 'varchar' })
  imdbID: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  year: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  poster: string;

  @Column({ type: 'text', nullable: true })
  plot: string;

  @Column({ type: 'varchar', nullable: true })
  director: string;

  @Column({ type: 'varchar', nullable: true })
  actors: string;

  @Column({ type: 'varchar', nullable: true })
  imdbRating: string;

  @Column({ type: 'varchar', nullable: true })
  rated: string;

  @Column({ type: 'varchar', nullable: true })
  genre: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

