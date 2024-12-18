import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from './entities';
import { ProfileModule } from '../profile/profile.module';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET') || 'secretKey',
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN') || '60s',
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfileModule),
    forwardRef(() => RolesModule),
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
