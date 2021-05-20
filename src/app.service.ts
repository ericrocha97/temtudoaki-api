import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): any {
    const result = {
      message: "TEMTUDOAKI-API",
    }
    return result;
  }
}
