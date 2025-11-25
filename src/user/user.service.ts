import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';
import { UserInterface } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Or, Repository } from 'typeorm';
import { Personal_Details } from 'src/typeorm/entities/Personal_Details';
import { Employment_Details } from 'src/typeorm/entities/Employment_Details';

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
    return this.userRepository.findOneBy({ id });
  }

  getPersonalById(user: {}) {
    return this.personalRepository.findOneBy({ userId: user });
  }

  getEmployeeById(user: {}) {
    return this.employeeRepository.findOneBy({ userId: user });
  }

  async createUser(userData: UserInterface) {
    const fullname = userData.fullname;
    const email = userData.email;
    const exists = await this.userRepository.exists({
      where: { fullname, email },
    });

    if (!exists) {
      console.log(exists);

      const {
        fullname,
        email,
        password,
        gender,
        age,
        phone,
        address,
        designation,
        salary,
        joindate,
        department,
      } = userData;

      const newUser = this.userRepository.create({
        fullname,
        email,
        password,
      });
      await this.userRepository.save(newUser);

      const personal = this.personalRepository.create({
        gender,
        age,
        phone,
        address,
        userId: newUser,
      });
      await this.personalRepository.save(personal);

      const employee = this.employeeRepository.create({
        designation,
        salary,
        joindate,
        department,
        userId: newUser,
      });
      await this.employeeRepository.save(employee);

      return exists;
    } else {
      console.log(exists);
      return exists;
    }
  }

  /* async createUser(userData: UserInterface) {
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
  } */

  async updateUser(id: number, updateUser: Partial<UserInterface>) {
    const exists = await this.userRepository.exists({
      where: { id },
    });

    if (exists == true) {
      //console.log(exists);
      const user = await this.getUserById(id);

      const userData = {
        fullname: updateUser.fullname ?? user?.fullname,
        email: updateUser.email ?? user?.email,
        password: updateUser.password ?? user?.password,
      };
      await this.userRepository.update({ id }, { ...userData });

      const personal = await this.getPersonalById({ ...user });

      const personalData = {
        gender: updateUser.gender ?? personal?.gender,
        age: updateUser.age ?? personal?.age,
        phone: updateUser.phone ?? personal?.phone,
        address: updateUser.address ?? personal?.address,
      };
      console.log(personalData);
      await this.personalRepository.update(
        { userId: { ...user } },
        { ...personalData },
      );

      const employee = await this.getEmployeeById({ ...user });

      const employeeData = {
        designation: updateUser.designation ?? employee?.designation,
        salary: updateUser.salary ?? employee?.salary,
        joindate: updateUser.joindate ?? employee?.joindate,
        department: updateUser.department ?? employee?.department,
      };
      await this.employeeRepository.update(
        { userId: { ...user } },
        { ...employeeData },
      );

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
      const user = await this.getUserById(id);
      console.log(exists);

      await this.personalRepository.delete({ userId: { ...user } });
      await this.employeeRepository.delete({ userId: { ...user } });
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
