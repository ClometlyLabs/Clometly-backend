import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { compare } from 'bcrypt';

import { User } from './entities';
import { Role } from '../roles/entities';
import { Permission } from '../permission/entities/permission.entity';

import { CreateUserDto, LoginUserDto } from './dto';
import { CreateProfileDto } from '../profile/dto';

import { validateUserUniqueness, createUser } from './shared/utils/user-utils';
import { generateToken } from './shared/utils/jwt/jwt-utils';

import { ProfileService } from '../profile/profile.service';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    private readonly profileService: ProfileService,
    private readonly permissionService: PermissionService,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}
  async register(
    createUserDto: CreateUserDto,
    createProfileDto: CreateProfileDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { email, username } = createUserDto;
      await validateUserUniqueness(this.userRepository, email, username);

      const user = await createUser(
        this.userRepository,
        queryRunner,
        createUserDto,
      );
      const profile = await this.profileService.createProfile(
        queryRunner,
        createProfileDto,
        user,
      );
      await this.permissionService.assignPermission(
        this.roleRepository,
        this.permissionRepository,
        queryRunner,
        createUserDto.role,
        user,
      );

      const token = generateToken(this.jwtService, profile.user.id, profile.id);
      await queryRunner.commitTransaction();

      return { user, token };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const valid = await compare(password, user.password);
    if (!valid) throw new ForbiddenException('Contraseña incorrecta');

    const token = generateToken(this.jwtService, user.id, user.profile.id);
    return { acces_token: token };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.userRepository.softDelete(user);
    return { message: 'Usuario eliminado' };
  }
}
