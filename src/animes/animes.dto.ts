import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateAnimeDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  readonly categories: [];

  @IsNotEmpty()
  @IsBoolean()
  readonly is_in_emision: boolean;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly seasons: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly image_url: string;

  @IsNotEmpty()
  @IsNumber()
  readonly stars: number;

  @IsNotEmpty()
  @IsNumber()
  readonly realeased_year: number;
}

export class UpdateAnimeDTO extends PartialType(CreateAnimeDTO) {}
