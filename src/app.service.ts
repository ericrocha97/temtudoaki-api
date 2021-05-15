import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getObject(): any {
    const object = {
      id: 1,
      name: "Eri"
    }
    return object;
  }
}
