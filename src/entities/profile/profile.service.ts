import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto';
import { User } from '../auth/entities';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(
    queryRunner: any,
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user,
    });

    return queryRunner.manager.save(profile);
  }
}
