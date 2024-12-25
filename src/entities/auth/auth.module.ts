import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from './entities';
import { ProfileModule } from '../profile/profile.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

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
    forwardRef(() => RolesModule),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
