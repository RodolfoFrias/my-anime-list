import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param() userId) {
    return this.userService.findOne(userId);
  }

  @Put(':userId')
  update(@Param() userId, @Body() changes) {
    return this.userService.update(userId, changes);
  }
}
