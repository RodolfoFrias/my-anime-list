import {
  IsAlphanumeric,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsArray()
  readonly favorite_animes: [];

  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(8, 16)
  readonly password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
