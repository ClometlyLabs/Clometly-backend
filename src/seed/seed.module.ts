import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/entities/auth/auth.module';
import { RoleModule } from 'src/entities/role/role.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule, AuthModule, RoleModule],
})
export class SeedModule {}
