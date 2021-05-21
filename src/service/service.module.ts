import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { serviceProviders } from './service.providers';
import { DatabaseModule } from 'src/database/database.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [DatabaseModule, TokenModule],
  providers: [
    ...serviceProviders,
    ServiceService],
  controllers: [ServiceController],
  exports: [ServiceService]
})
export class ServiceModule { }
