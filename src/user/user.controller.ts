import { Controller, Get, Post, Body } from '@nestjs/common';
import { resultDto } from 'src/dto/result.dto';
import { userCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('listAllUser')
  async listAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  async createUser(@Body() data: userCreateDto): Promise<resultDto> {
    return this.userService.create(data);
  }

}
