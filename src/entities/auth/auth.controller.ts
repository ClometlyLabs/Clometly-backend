import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { normalizeEmail } from './utils';

import { AuthService } from './auth.service';
import { CreateUserDto, CreateProfileDto, LoginUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return await this.authService.registerAccount(
      createUserDto,
      createProfileDto,
    );
  }

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() loginDto: LoginUserDto) {
    const email = normalizeEmail(loginDto.email);
    return await this.authService.loginUser({ ...loginDto, email });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string) {
    return await this.authService.getUser(id);
  }
}
