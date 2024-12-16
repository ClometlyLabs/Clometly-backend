import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from './entities';
import { ProfileModule } from '../profile/profile.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User]), ProfileModule, RolesModule],
  exports: [TypeOrmModule],
})
export class AuthModule {}
