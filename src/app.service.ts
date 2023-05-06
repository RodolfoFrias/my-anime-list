import { Injectable } from '@nestjs/common';
import { Anime } from './animes/animes.entity';
import { AnimesService } from './animes/animes.service';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { AnimeAPI } from './app.interfaces';

@Injectable()
export class AppService {
  constructor(
    private animeService: AnimesService,
    private configService: ConfigService,
  ) {}

  async getAnimes(): Promise<AnimeAPI[]> {
    const { API_URL, API_KEY, API_HOST } = this.configService.get(
      'config.thirdPartyAPI',
    );
    const axiosResponse: AxiosResponse = await axios.get(API_URL, {
      params: {
        fields: 'id,title,main_picture,synopsis,status',
        limit: '100',
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });

    return axiosResponse.data;
  }
}
