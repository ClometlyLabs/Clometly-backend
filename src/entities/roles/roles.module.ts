import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

import { Role } from './entities/roles.entity';
import { UserRole } from './entities/roles_user.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  exports: [TypeOrmModule],
})
export class RolesModule {}
