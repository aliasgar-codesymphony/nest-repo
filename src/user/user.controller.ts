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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const exists = await this.userService.createUser(userData);
    if (exists) {
      return { message: 'User Already Exists' };
    } else {
      return { message: 'User created successfully' };
    }
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
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
