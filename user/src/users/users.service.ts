import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(uid: string): Promise<User> {
    return this.usersRepository.findOneBy({ uid: uid });
  }

  async remove(uid: string): Promise<void> {
    await this.usersRepository.delete(uid);
  }

  async update(uid: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(uid, updateUserDto);
    return this.usersRepository.findOneBy({ uid: uid });
  }
}
