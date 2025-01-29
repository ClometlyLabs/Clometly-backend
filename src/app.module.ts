import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerStaticModule } from '@nestjs/serve-static';

import { SeedModule } from './seed/seed.module';
import { AuthModule } from './entities/auth/auth.module';
import { ProfileModule } from './entities/profile/profile.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnterpriseModule } from './entities/enterprise/enterprise.module';
import { PermissionModule } from './entities/permission/permission.module';
import { FileModule } from './entities/file/file.module';

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
    EnterpriseModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Ruta de la carpeta de archivos
      serveRoot: '/uploads', // Prefijo para las URLs
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
