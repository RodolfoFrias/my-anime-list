import { Controller, Get, Res, Next, Inject, Logger } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Controller()
export class AppController {
  private TTL = 24 * 60 * 60 * 1000; // 24hrs
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/external/animes')
  async allAnimes(@Res() res: Response, @Next() next: NextFunction) {
    try {
      let animesInMemory = await this.cacheManager.get('animes');

      if (!animesInMemory) {
        this.logger.log('Calling API, no animes in memory');
        animesInMemory = await this.appService.getAnimes();
        await this.setCache(animesInMemory);
      }

      res.json(animesInMemory);
    } catch (error) {
      next(error);
    }
  }

  private async setCache(value): Promise<void> {
    await this.cacheManager.set('animes', value, this.TTL);
  }
}
