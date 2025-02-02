import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

//entities
import { User } from './entities/user.entity';

//dto
import { CreateUserDto, CreateProfileDto, LoginUserDto } from './dto';

//tools
import {
  generateCode,
  hashPassword,
  generateToken,
  normalizeEmail,
  comparePassword,
} from './utils';

//service
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async userExists(email: string, username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username, email },
    });
    return !!user;
  }
  async createUser(userDto: CreateUserDto, queryRunner: any): Promise<User> {
    const { username, email, password } = userDto;

    const exists = await this.userExists(email, username);
    if (exists) throw new BadRequestException('El usuario ya existe.');

    const user = this.userRepository.create({
      ...userDto,
      email: normalizeEmail(email),
      code: generateCode(),
      password: await hashPassword(password),
    });

    return queryRunner.manager.save(user);
  }
  async registerAccount(userDto: CreateUserDto, profileDto: CreateProfileDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { email, username } = userDto;
      await this.userExists(email, username);

      const user = await this.createUser(userDto, queryRunner);

      const profile = await this.profileService.createProfile(
        queryRunner,
        profileDto,
        user,
      );

      const token = generateToken(this.jwtService, profile.user.id, profile.id);
      await queryRunner.commitTransaction();

      return { acces_token: token };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    }
  }
  async loginUser(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    normalizeEmail(email);

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    const valid = await comparePassword(password, user.password);

    if (!valid) throw new ForbiddenException('Contraseña incorrecta');
    const token = generateToken(this.jwtService, user.id, user.profile.id);

    return { acces_token: token };
  }
  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }
}
