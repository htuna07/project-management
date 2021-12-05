import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './decorators/exception';
import { MiddleWares } from './middleware/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // FILTERS
  app.useGlobalFilters(new ErrorFilter());

  await app.listen(3000);
}
bootstrap();
