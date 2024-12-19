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
import { Role, UserRole } from '../roles/entities';

import { CreateUserDto, LoginUserDto } from './dto';
import { CreateProfileDto } from '../profile/dto';

import { validateUserUniqueness, createUser } from './shared/utils/user-utils';
import { assignUserRole } from '../roles/shared/utils/roles-utils';
import { generateToken } from './shared/utils/jwt/token-utils';

import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,

    private readonly profileService: ProfileService,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}
  async create(
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
      await this.profileService.createProfile(
        queryRunner,
        createProfileDto,
        user,
      );
      await assignUserRole(
        this.roleRepository,
        this.userRoleRepository,
        queryRunner,
        createUserDto.role,
        user,
      );

      const token = generateToken(this.jwtService, user.id, user.email);
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

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const valid = await compare(password, user.password);
    if (!valid) throw new ForbiddenException('Contraseña incorrecta');

    const token = generateToken(this.jwtService, user.id, user.email);
    return { acces_token: token };
  }
}
