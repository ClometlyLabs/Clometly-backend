import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import { CreateProfileDto } from '../profile/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return await this.authService.create(createUserDto, createProfileDto);
  }

  @Post('signin')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('users')
  async getUsers() {
    return 'all users';
  }
}
