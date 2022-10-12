import { Column, PrimaryColumn } from 'typeorm';

export class Anime {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'array' })
  categories: [];

  @Column({ type: 'boolean' })
  is_in_emision: boolean;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'number' })
  seasons: number;

  @Column({ type: 'varchar' })
  image_url: string;

  @Column({ type: 'number' })
  stars: number;

  @Column({ type: 'number' })
  realeased_year: number;
}
