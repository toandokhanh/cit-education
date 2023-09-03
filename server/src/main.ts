import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // pipes used for Globals
  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Update with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  };
  // Enable CORS with the defined options
  app.enableCors(corsOptions);
  await app.listen(3003);
}
bootstrap();
