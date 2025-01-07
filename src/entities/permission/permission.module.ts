import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

import { Permission } from './entities/permission.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), RoleModule],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
