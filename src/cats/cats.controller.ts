import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCat } from './dto/create-cat.dto';
import { UpdateCat } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(@Query('name') name?: string) {
    return this.catsService.findAll(name);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createCatDto: CreateCat,
  ) {
    return this.catsService.create(createCatDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) 
    updateCatDto: UpdateCat,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.deleteOne(id);
  }
}
