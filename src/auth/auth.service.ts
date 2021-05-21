import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.tokenService.save(token, user.email);
    return {
      access_token: token,
    };
  }

  async loginWithToken(token: string) {
    const user: User = await this.tokenService.getUserByToken(token)
    if (user) {
      return this.login(user);
    } else {
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}
