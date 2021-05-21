import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { resultDto } from 'src/dto/result.dto';
import { userCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { databaseProviders } from 'src/database/database.providers';
import { userLoginTokenDto } from './dto/user.loginToken.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) { }

  @Post('create')
  async createUser(@Body() data: userCreateDto): Promise<resultDto> {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login-token')
  async loginWithToken(@Request() req, @Body() data: userLoginTokenDto) {
    return this.authService.loginWithToken(data.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('listAllUser')
  async listAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

}
