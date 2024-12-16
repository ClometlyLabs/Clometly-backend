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
      // Buscar el rol correspondiente
      const role = await this.roleRepository.findOne({
        where: { name: createUserDto.role },
      });

      if (!role) {
        throw new BadRequestException('Role not found');
      }

      const user = this.userRepository.create({
        ...createUserDto,
        role,
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
