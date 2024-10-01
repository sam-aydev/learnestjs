import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /*
  Swagger Documenttation
  */

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Learning NestJs - From One Who Knows It')
    .setDescription('Use the base API url')
    .setTermsOfService('https:localhost:3000/terms')
    .setLicense('MIT License', 'https://localhost:3000/piu')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1', app, document);
  await app.listen(3000);
}
bootstrap();
