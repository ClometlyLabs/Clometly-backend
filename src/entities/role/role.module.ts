import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';

import { Role } from './entities/roles.entity';
import { Permission } from '../permission/entities/permission.entity';

import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    forwardRef(() => AuthModule),
  ],
  exports: [RoleService, TypeOrmModule],
})
export class RoleModule {}
