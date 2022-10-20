import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHomePage(@Res() res: Response) {
    const animes = await this.appService.getAnimes();
    console.log(animes)
    return res.render('app', { animes: animes });
  }
}
