import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

import { Profile } from './entities/profile.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([Profile]), forwardRef(() => AuthModule)],
  exports: [ProfileService, TypeOrmModule],
})
export class ProfileModule {}
