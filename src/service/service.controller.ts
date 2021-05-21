import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { resultDto } from 'src/dto/result.dto';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/user.entity';
import { serviceCreateDto } from './dto/service.create.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly tokenService: TokenService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() data: serviceCreateDto, @Req() req): Promise<resultDto> {
    const token = req.headers.authorization;
    const user: User = await this.tokenService.getUserByToken(token)
    if (user) {
      return this.serviceService.create(data, user)
    } else {
      throw new HttpException({
        errorMessage: 'Token invalido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}
