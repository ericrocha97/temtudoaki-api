import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from '../database/database.module';
import { tokenProviders } from './token.providers';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), UserModule],
  controllers: [TokenController],
  providers: [
    ...tokenProviders,
    TokenService,
  ],
  exports: [TokenService],
})
export class TokenModule { }