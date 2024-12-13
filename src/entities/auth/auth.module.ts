import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User, Role } from './entities';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User, Role]), ProfileModule],
  exports: [TypeOrmModule],
})
export class AuthModule {}
