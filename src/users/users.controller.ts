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
  ValidationPipe,
  HttpCode,
  UseFilters,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('users') // /users - routes will be handled here('@' is prefixed is NestJS compiles and gives it automatically when the route is called)

// @UseFilters(new HttpExceptionFilter()) //This is a custom filter to execute the exceptions in way we need

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users (or) /users?role=value
  @Roles('ADMIN')
  findAll(
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN' | 'SUPER_ADMIN',
  ) {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
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
