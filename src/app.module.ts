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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
