import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
//import { LocalAuthGuard } from './auth/local-auth.guard';
import { resultDto } from 'src/dto/result.dto';
import { userCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) { }

  @Get('listAllUser')
  async listAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  async createUser(@Body() data: userCreateDto): Promise<resultDto> {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
