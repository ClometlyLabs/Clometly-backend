import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // dotenv.config();
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
