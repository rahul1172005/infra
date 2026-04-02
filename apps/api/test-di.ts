import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { logger: false });
    console.log('AppModule initialized successfully!');
    await app.close();
  } catch (e) {
    console.error('DI FAILURE DETECTED:');
    console.error(e);
    process.exit(1);
  }
}
bootstrap();
