import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { CreateAnimeDTO } from './animes.dto';

@Controller('animes')
export class AnimesController {
  constructor(private animeService: AnimesService) {}

  @Post()
  create(@Body() body: CreateAnimeDTO) {
    return this.animeService.create(body);
  }

  @Get('all')
  findAll() {
    return this.animeService.findAll();
  }

  @Get(':animeId')
  findOne(@Param() animeId) {
    return this.animeService.findOne(animeId);
  }

  @Put(':animeId')
  update(@Param() animeId, @Body() changes) {
    return this.animeService.update(animeId, changes);
  }
}
