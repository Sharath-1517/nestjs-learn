import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty!' })
  @IsString({ message: 'Password must not be empty!' })
  @MinLength(8, { message: 'Must contain atleast 8 characters' })
  @MaxLength(15, { message: 'Must contain max 15 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Username Must contain atleast 2 characters' })
  userName: string;
}

export class EmailAuth {
  @IsNotEmpty()
  @IsString()
  email: string;
}
