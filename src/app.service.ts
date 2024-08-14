import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log("AppService is being instantiated");
  }
  getHello(): string {
    return 'Hello World!';
  }
}
