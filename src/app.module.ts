import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaoptionsModule } from './metaoptions/metaoptions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { DataResponseInterceptor } from './common/interceptors/data-response.interceptor';
import { UploadsModule } from './uploads/uploads.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    PropertyModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        autoLoadEntities: true,
        // entities: [User],
        port: +configService.get('DATABASE_PORT'),
        username: 'postgres',
        password: '12345',
        host: configService.get('DATABASE_HOST'),
        database: configService.get('DATABASE_NAME'),
      }),
    }),
    TagsModule,
    MetaoptionsModule,
    PaginationModule,
    AuthModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([User]),
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
