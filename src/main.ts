import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global middleware, to access in all the routes with no exception.
  // app.use(LoggerMiddleware);
  await app.listen(3000);
}
bootstrap();
