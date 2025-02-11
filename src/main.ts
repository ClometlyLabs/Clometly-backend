import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as express from 'express';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // dotenv.config();
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
