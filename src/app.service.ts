import { Injectable } from '@nestjs/common';
import { Anime } from './animes/animes.entity';
import { AnimesService } from './animes/animes.service';

@Injectable()
export class AppService {
  constructor(private animeService: AnimesService) {}

  async getAnimes(): Promise<Anime[]> {
    return this.animeService.findAll();
  }

  async getAnime(animeId: string): Promise<Anime> {
    return this.animeService.findOne(animeId);
  }
}
