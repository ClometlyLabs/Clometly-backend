import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, Role } from './entities';
import { CreateUserDto, CreateProfileDto, UpdateUserDto } from './dto';
import { Profile } from '../profile/entities/profile.entity';

import { generateRandomCode } from './shared/utils/string-utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    createProfileDto: CreateProfileDto,
  ) {
    try {
      const role = await this.roleRepository.findOne({
        where: { name: createUserDto.role },
      });
      const user = this.userRepository.create({
        ...createUserDto,
        role,
        code: generateRandomCode(6),
      });
      await this.userRepository.save(user);

      const profile = this.profileRepository.create({
        ...createProfileDto,
        user,
      });
      await this.profileRepository.save(profile);

      return { user, profile };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
