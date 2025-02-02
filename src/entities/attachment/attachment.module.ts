import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY || 'secretKey',
    //   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '60s' },
    // }),
    AuthModule,
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
