import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaoptionsModule } from './metaoptions/metaoptions.module';

@Module({
  imports: [
    PropertyModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        synchronize: true,
        autoLoadEntities: true,
        // entities: [User],
        port: 5432,
        username: 'postgres',
        password: '12345',
        host: 'localhost',
        database: 'nestjslearn',
      }),
    }),
    TagsModule,
    MetaoptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
