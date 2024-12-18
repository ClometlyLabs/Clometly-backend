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
import { CreateUserRoleDto } from '../roles/dto/create-role-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body() createProfileDto: CreateProfileDto,
    @Body() createUserRoleDto: CreateUserRoleDto,
  ) {
    return await this.authService.create(
      createUserDto,
      createProfileDto,
      createUserRoleDto,
    );
  }

  @Get('users')
  async getUsers() {
    return await this.authService.getUsers();
  }
}
