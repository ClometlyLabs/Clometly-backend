import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedModule } from './seed/seed.module';
import { AuthModule } from './entities/auth/auth.module';
import { ProfileModule } from './entities/profile/profile.module';
import { RolesModule } from './entities/roles/roles.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnterpriseModule } from './entities/enterprise/enterprise.module';
import { PermissionModule } from './entities/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    PermissionModule,
    SeedModule,
    RolesModule,
    EnterpriseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
