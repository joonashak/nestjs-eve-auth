import { Injectable } from '@nestjs/common';
import { getHello } from 'nestjs-eve-sso';

@Injectable()
export class AppService {
  getHello(): string {
    return getHello();
  }
}
