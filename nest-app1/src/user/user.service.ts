import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
  constructor(private readonly helloService: HelloService) {}

  getAllUsers() {
    return [
      {
        id: 1,
        name: 'Amit',
      },
      {
        id: 2,
        name: 'John',
      },
      {
        id: 3,
        name: 'Raj',
      },
    ];
  }

  getUserById(id: number) {
    const user = this.getAllUsers().find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  getWelcomeMessage(id: number): string {
    const user = this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.helloService.getHelloWithName(user.name);
  }
}
