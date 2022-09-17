import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Punto de entrada al microservicio de usuarios de Gamestack!';
  }
}
