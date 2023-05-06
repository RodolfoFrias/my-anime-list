import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHomePage(@Res() res: Response) {
    res.send('OK');
  }

  @Get('/view/')
  async getSinglePage(@Res() res: Response, @Param() param) {
    res.send('OK');
  }
}
