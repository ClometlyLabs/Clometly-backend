import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//dto
import { CreateProfileDto } from './dto/create-profile.dto';

//entities
import { Profile } from './entities/profile.entity';
import { User } from '../auth/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { instanceToPlain } from 'class-transformer';

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
  async updateProfile(profileId: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) throw new NotFoundException('Perfil no encontrado.');

    Object.assign(profile, updateProfileDto);
    await this.profileRepository.save(profile);

    return profile;
  }
  async getProfile(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User no encontrado.');

    return instanceToPlain(user);
  }
}
