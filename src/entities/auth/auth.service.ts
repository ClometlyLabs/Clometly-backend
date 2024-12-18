import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities';
import { CreateUserDto, CreateProfileDto, UpdateUserDto } from './dto';

import { generateRandomCode } from './shared/utils/string-utils';
import { Role, UserRole } from '../roles/entities';

import { Profile } from '../profile/entities/profile.entity';
import { CreateUserRoleDto } from '../roles/dto/create-role-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    private readonly dataSource: DataSource,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    createProfileDto: CreateProfileDto,
    createUserRoleDto: CreateUserRoleDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
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

      const role = await this.roleRepository.findOne({
        where: {
          name: createUserDto.role,
          context: 'platform',
        },
      });
      const userRole = this.userRoleRepository.create({
        role,
        user,
      });
      await this.userRoleRepository.save(userRole);

      return {
        user: user,
        profile: profile,
        role: role,
        userRole: userRole,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw new BadRequestException(error.message || 'Failed to create user');
    } finally {
      await queryRunner.release();
    }
  }

  async getUsers() {
    const users = await this.userRepository.find({
      loadRelationIds: true,
      relations: ['profile'],
    });
    console.log(users);
    return users;
  }
}
