import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';
import { UserInterface } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { Personal_Details } from 'src/typeorm/entities/Personal_Details';
import { Employment_Details } from 'src/typeorm/entities/Employment_Details';
import * as bcrypt from 'bcrypt';
import { match } from 'assert';

@Injectable()
export class UserService {
  constructor(
    private readonly helloService: HelloService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Personal_Details)
    private personalRepository: Repository<Personal_Details>,
    @InjectRepository(Employment_Details)
    private employeeRepository: Repository<Employment_Details>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async createUser(userData: UserInterface) {
    const fullname = userData.fullname;
    const email = userData.email;
    const exists = await this.userRepository.exists({
      where: { fullname, email },
    });

    if (!exists) {
      console.log(exists);
      const { fullname, email, password } = userData;
      const hash = await bcrypt.hash(password, 10);
      console.log(hash);

      const newUser = this.userRepository.create({
        fullname: fullname,
        email: email,
        password: hash,
      });

      await this.userRepository.save(newUser);

      return exists;
    } else {
      console.log(exists);
      return exists;
    }
  }

  async comparePass(id: number, pass: string) {
    const user = await this.getUserById(id);
    if (user != null) {
      const isMatch = await bcrypt.compare(pass, user?.password);
      return isMatch;
    } else {
      return 'Password not Match';
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (user != null) {
      const isMatch = await bcrypt.compare(password, user?.password);
      return user;
    } else {
      throw new UnauthorizedException();
    }
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
