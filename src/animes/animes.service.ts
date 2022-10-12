import { Injectable } from '@nestjs/common';
import { CreateAnimeDTO } from './animes.dto';

@Injectable()
export class AnimesService {
  create(payload: CreateAnimeDTO) {
    return payload;
  }

  findAll() {
    return true;
  }

  findOne(id: number) {
    return id;
  }

  update(id: number) {
    return id;
  }
}
