import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/roles.decorator';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  /* @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      //console.log(user);
      return { message: 'User Not Exists' };
    } else {
      console.log(user);
      const personal = await this.userService.getPersonalById(user);
      console.log(personal);
      const employee = await this.userService.getEmployeeById(user);
      console.log(employee);
      //return { ...user, ...personal, ...employee };
      return { user, personal, employee };
    }
  } */

  @Get('compare/:id/:pass')
  comparePass(@Param('id', ParseIntPipe) id: number,@Param('pass') pass:string){
    return this.userService.comparePass(id,pass)
  }

  @Get('id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const exists = await this.userService.createUser(userData);
    if (exists) {
      return { message: 'User Already Exists' };
    } else {
      return { message: 'User created successfully' };
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: updateUserDto,
  ) {
    const exists = await this.userService.updateUser(id, updateData);
    if (exists == false) {
      return { message: 'User Not Exists' };
    } else {
      return { message: 'User updated successfully' };
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const exists = await this.userService.deleteUser(id);
    if (exists == true) {
      return { message: 'User deleted successfully' };
    } else {
      return { message: 'User not Exists' };
    }
  }

  /*  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get(':id/welcome')
  getWelcomeMessage(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getWelcomeMessage(id);
  } */
}
