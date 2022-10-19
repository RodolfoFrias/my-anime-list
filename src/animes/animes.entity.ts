import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'animes' })
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  categories: [];

  @Column({ type: 'boolean' })
  is_in_emision: boolean;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  seasons: number;

  @Column({ type: 'varchar' })
  image_url: string;

  @Column({ type: 'integer' })
  stars: number;

  @Column({ type: 'integer' })
  realeased_year: number;
}
