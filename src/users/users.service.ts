import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { isNil } from 'lodash';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(payload: CreateUserDTO): Promise<User> {
    const newUser = this.userRepo.create(payload);
    return this.userRepo.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });

    if (!isNil(user)) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id: string, changes: UpdateUserDTO): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }
}
