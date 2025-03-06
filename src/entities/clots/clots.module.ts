import { Module } from '@nestjs/common';
import { ClotsService } from './clots.service';
import { ClotsController } from './clots.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clot } from './entities/clot.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/clots',
    }),
    TypeOrmModule.forFeature([Clot]),
  ],
  controllers: [ClotsController],
  providers: [ClotsService],
})
export class ClotsModule {}
