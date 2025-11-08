import { Injectable, NotFoundException } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';
import { UserInterface } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly helloService: HelloService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userData: UserInterface) {
    const fullname = userData.fullname;
    const email = userData.email;
    const exists = await this.userRepository.exists({
      where: { fullname, email },
    });

    if (!exists) {
      console.log(exists);
      const newUser = this.userRepository.create({
        ...userData,
      });
      await this.userRepository.save(newUser);

      return exists;
    } else {
      console.log(exists);
      return exists;
    }
  }

  getUsers() {
    return this.userRepository.find();
  }

  async updateUser(id: number, updateUser: Partial<UserInterface>) {
    const exists = await this.userRepository.exists({
      where: { id },
    });

    if (exists == true) {
      console.log(exists);
      await this.userRepository.update({ id }, { ...updateUser });

      return exists;
    } else {
      console.log(exists);
      return exists;
    }
  }

  async deleteUser(id: number) {
    const exists = await this.userRepository.exists({
      where: { id },
    });
    if (exists == true) {
      console.log(exists);
      await this.userRepository.delete({ id });
      return exists;
    } else {
      console.log(exists);
      return exists;
    }
  }

  /* getAllUsers() {
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
  } */
}
