import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /*
  Swagger Documenttation
  */

  const swaggerConfig = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Learning NestJs - From One Who Knows It')
    .setDescription('Use the base API url')
    .setTermsOfService('https:localhost:3000/terms')
    .setLicense('MIT License', 'https://localhost:3000/piu')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('v1', app, document);

  // Setup aws sdk used uploading the files to aws s3
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  await app.listen(3000);
}
bootstrap();
