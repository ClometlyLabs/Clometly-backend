import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { User } from './entities';

import { RoleModule } from '../role/role.module';
import { ProfileModule } from '../profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET_KEY || 'secretKey',
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN || '60s',
          },
        };
      },
    }),
    forwardRef(() => ProfileModule),
    forwardRef(() => RoleModule),
    PermissionModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule, JwtModule],
})
export class AuthModule {}
