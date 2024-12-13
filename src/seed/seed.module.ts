import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/entities/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule, AuthModule],
})
export class SeedModule {}
