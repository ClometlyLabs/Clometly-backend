import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities';
import { CreateUserDto, CreateProfileDto, UpdateUserDto } from './dto';
import { Profile } from '../profile/entities/profile.entity';

import { generateRandomCode } from './shared/utils/string-utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    createProfileDto: CreateProfileDto,
  ) {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        code: generateRandomCode(6),
        password: await bcrypt.hash(createUserDto.password, 10),
      });

      await this.userRepository.save(user);

      const profile = this.profileRepository.create({
        ...createProfileDto,
        user,
      });

      await this.profileRepository.save(profile);

      return { user };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message || 'Failed to create user');
    }
  }

  async getUsers() {
    return await this.userRepository.find({ relations: ['role', 'profile'] });
  }
}
