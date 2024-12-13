import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateProfileDto, CreateUserDto, UpdateUserDto } from './dto';

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
}
