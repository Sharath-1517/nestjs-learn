import {IsString, IsNotEmpty, IsInt, IsArray, ArrayMinSize, isInt} from 'class-validator';

export class CreateCat {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @ArrayMinSize(1)
  @IsArray()
  personality: string[];

}