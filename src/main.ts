import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@api/app/app.module';
import { BackendValidationPipe } from './pipes/backendValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new BackendValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
