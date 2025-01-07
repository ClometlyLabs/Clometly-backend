import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

import { Role } from './entities/roles.entity';
import { Permission } from '../permission/entities/permission.entity';

import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    forwardRef(() => AuthModule),
  ],
  exports: [RolesService, TypeOrmModule],
})
export class RolesModule {}
