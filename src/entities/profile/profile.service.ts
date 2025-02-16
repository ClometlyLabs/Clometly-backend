import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//dto
import { CreateProfileDto } from './dto/create-profile.dto';

//entities
import { Profile } from './entities/profile.entity';
import { User } from '../auth/entities/user.entity';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createProfile(
    queryRunner: any,
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    const profile = this.profileRepository.create({
      ...createProfileDto,
      phone: createProfileDto.phone.toString(),
      user,
    });

    return queryRunner.manager.save(profile);
  }

  async uploadProfileImage(profileId: string, image: string) {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) throw new NotFoundException('Perfil no encontrado.');

    profile.profile_pic = image;
    await this.profileRepository.save(profile);

    return 'Imagen de perfil actualizada correctamente.';
  }

  async getProfile(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User no encontrado.');

    return user.profile;
  }
}
