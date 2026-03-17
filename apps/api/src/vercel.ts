import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return;
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { logger: false }
  );
  app.enableCors();
  await app.init();
  isInitialized = true;
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  server(req, res);
}
