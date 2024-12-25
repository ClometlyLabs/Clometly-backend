import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import { CreateProfileDto } from '../profile/dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return await this.authService.register(createUserDto, createProfileDto);
  }

  @Post('signin')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(@Req() req: Request) {
    return { message: 'Ruta protegida' };
  }

  @Post('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: any) {
    return { message: 'Ruta protegida', user: req.user };
  }
}
