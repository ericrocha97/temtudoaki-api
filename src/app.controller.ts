import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    console.log(process.env.SECRET_KEY)
    return this.appService.getHello();
  }

  @Get('object')
  getObject(): any {
    return this.appService.getObject();
  }
}
