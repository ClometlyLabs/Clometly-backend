import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { PermissionModule } from '../permission/permission.module';
import { RoleModule } from '../role/role.module';

@Module({
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
  imports: [
    TypeOrmModule.forFeature([Enterprise]),
    AuthModule,
    RoleModule,
    PermissionModule,
  ],
})
export class EnterpriseModule {}
