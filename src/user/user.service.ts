import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUserById(id: string) {
    return {
      id,
      name: 'Michał Dziuba',
      email: 'mail@michaldziuba.dev',
    };
  }
}
