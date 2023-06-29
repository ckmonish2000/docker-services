import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // schema validation middleware
  app.useGlobalPipes(new ValidationPipe());
  // swagger config
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription("The user CRUD API's")
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
