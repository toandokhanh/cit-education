import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  dotenv.config();
  if (!process.env.FLASK_SERVICE_TOKEN || process.env.FLASK_SERVICE_TOKEN.length < 32 || process.env.FLASK_SERVICE_TOKEN === process.env.JWT_SECRET) {
    throw new Error('Set a distinct FLASK_SERVICE_TOKEN of at least 32 characters');
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })); // pipes used for Globals
  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // Update with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  };
  // Enable CORS with the defined options
  app.enableCors(corsOptions);
  await app.listen(Number(process.env.PORT || 3003));
}
bootstrap();
