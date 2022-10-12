import { Module } from '@nestjs/common';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';

@Module({
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimesModule {}
