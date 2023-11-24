import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // /users - routes will be handled here('@' is prefixed is NestJS compiles and gives it automatically when the route is called)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users (or) /users?role=value
  findAll(
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN' | 'SUPER_ADMIN',
  ) {
    return this.usersService.findAll(role);
  }

  // The dynamic routes must be always in the last as it will consider the static routes as values instead of routes
  // For example:
  /* 
    @Get('interns')
    findAllInterns() {
      return []
    }
  */

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    // return this.usersService.create(user);
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
