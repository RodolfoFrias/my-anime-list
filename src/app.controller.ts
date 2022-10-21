import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHomePage(@Res() res: Response) {
    const animes = await this.appService.getAnimes();
    return res.render('app', { animes: animes });
  }

  @Get('/view/:animeId')
  async getSinglePage(@Res() res: Response, @Param() param) {
    const { animeId } = param;
    const anime = await this.appService.getAnime(animeId);
    return res.render('pages/anime', { anime: anime });
  }
}
