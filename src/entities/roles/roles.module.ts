import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

import { Role } from './entities/roles.entity';
import { UserRole } from './entities/user_roles.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Role, UserRole]),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule],
})
export class RolesModule {}
