import { Controller, Get, Res, Next, UseInterceptors } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/animes')
  async allAnimes(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const allAnimes = await this.appService.getAnimes();
      res.json(allAnimes);
    } catch (error) {
      next(error);
    }
  }
}
