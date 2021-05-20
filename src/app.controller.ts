import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getIndex(): any {
    console.log(process.env.SECRET_KEY)
    return this.appService.getIndex();
  }
}
