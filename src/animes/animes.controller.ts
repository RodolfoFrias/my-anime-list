import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnimesService } from './animes.service';
import { CreateAnimeDTO } from './animes.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('animes')
export class AnimesController {
  constructor(private animeService: AnimesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() body: CreateAnimeDTO,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.animeService.create(body, file);
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
