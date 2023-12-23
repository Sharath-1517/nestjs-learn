import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailAuth, LoginAuthDto, SignUpAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  findOne(@Body(ValidationPipe) loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/signup')
  createOne(@Body(ValidationPipe) signUpAuthDto: SignUpAuthDto) {
    return this.authService.signup(signUpAuthDto);
  }
}
