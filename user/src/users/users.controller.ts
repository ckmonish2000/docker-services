import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns list of all the users.',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':uid')
  @ApiResponse({
    status: 200,
    description: 'Returns a single user.',
  })
  findOne(@Param('uid', new ParseUUIDPipe()) uid: string): Promise<User> {
    return this.usersService.findOne(uid);
  }

  @Delete(':uid')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully removed.',
  })
  remove(@Param('uid', new ParseUUIDPipe()) uid: string): Promise<void> {
    return this.usersService.remove(uid);
  }

  @Put(':uid')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  update(
    @Param('uid', new ParseUUIDPipe()) uid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(uid, updateUserDto);
  }
}
