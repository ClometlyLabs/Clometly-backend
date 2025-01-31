import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { normalizeEmail } from './utils';

import { AuthService } from './auth.service';
import { CreateUserDto, CreateProfileDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return await this.authService.registerUser(createUserDto, createProfileDto);
  }

  @Post('signin')
  @HttpCode(200)
  async login(@Body() loginDto: LoginUserDto) {
    const email = normalizeEmail(loginDto.email);
    return await this.authService.loginUser({ ...loginDto, email });
  }
}
