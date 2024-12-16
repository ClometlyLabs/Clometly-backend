import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/entities/auth/auth.module';
import { RolesModule } from 'src/entities/roles/roles.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule, AuthModule, RolesModule],
})
export class SeedModule {}
