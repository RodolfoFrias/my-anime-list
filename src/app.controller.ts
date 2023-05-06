import { Controller, Get, Res, Next, Inject } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Controller()
export class AppController {
  private TTL = 1000;
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/animes')
  async allAnimes(@Res() res: Response, @Next() next: NextFunction) {
    try {
      let allAnimes;
      const isCacheExpired = await this.isExpired();

      if (isCacheExpired) {
        allAnimes = await this.appService.getAnimes();
        await this.setCache(allAnimes);
      }

      const animesToReturn = await this.cacheManager.get('animes');

      res.json(animesToReturn);
    } catch (error) {
      next(error);
    }
  }

  private async setCache(value): Promise<void> {
    await this.cacheManager.set('animes', value, this.TTL);
  }

  private isExpired(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
