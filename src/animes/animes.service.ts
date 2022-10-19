import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anime } from 'src/animes/animes.entity';
import { CreateAnimeDTO, UpdateAnimeDTO } from './animes.dto';

@Injectable()
export class AnimesService {
  constructor(@InjectRepository(Anime) private animeRepo: Repository<Anime>) {}

  create(payload: CreateAnimeDTO): Promise<Anime> {
    const newAnime = this.animeRepo.create(payload);
    return this.animeRepo.save(newAnime);
  }

  findAll(): Promise<Anime[]> {
    return this.animeRepo.find();
  }

  async findOne(id: string): Promise<Anime> {
    const anime = await this.animeRepo.findOne({
      where: { id: id },
    });
    if (!anime) {
      throw new Error('Anime not found');
    }
    return anime;
  }

  async update(id: string, changes: UpdateAnimeDTO): Promise<Anime> {
    const anime = await this.animeRepo.findOne({
      where: { id: id },
    });
    this.animeRepo.merge(anime, changes);
    return this.animeRepo.save(anime);
  }
}
