import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//dto
import { CreateProfileDto } from './dto/create-profile.dto';

//entities
import { Profile } from './entities/profile.entity';
import { User } from '../auth/entities/user.entity';

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
      phone: createProfileDto.phone.toString(),
      user,
    });

    return queryRunner.manager.save(profile);
  }
}
