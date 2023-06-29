import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // schema validation middleware
  app.useGlobalPipes(new ValidationPipe());
  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Orders API')
    .setDescription("The orders CRUD API's")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3200);
  console.log(`Application is running on: ${await app.getUrl()}.`);
}
bootstrap();
