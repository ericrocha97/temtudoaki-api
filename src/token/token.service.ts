import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) { }

  async save(hash: string, username: string) {
    const objToken = await this.tokenRepository.findOne({ username })
    if (objToken) {
      this.tokenRepository.update(objToken.id, {
        hash
      })
    } else {
      this.tokenRepository.insert({
        hash,
        username
      })
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.tokenRepository.findOne({ hash: oldToken })
    if (objToken) {
      const user = await this.userService.findOne(objToken.username)
      return this.authService.login(user)
    } else { //é uma requisição inválida
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }


  async getUserByToken(token: string): Promise<User> {
    token = token.replace("Bearer ", "").trim()
    const objToken: Token = await this.tokenRepository.findOne({ hash: token })
    if (objToken) {
      const user = await this.userService.findOne(objToken.username)
      return user
    } else { //é uma requisição inválida
      return null
    }
  }
}