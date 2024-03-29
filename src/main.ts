import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEchoToken } from './echo/echo.provider';
import { Echo } from '@novu/echo';
import { serve } from '@novu/echo/express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const echo = app.get<Echo>(getEchoToken());
  app.useBodyParser('json', { limit: '10mb' });
  app.use('/api/echo', serve({ client: echo }));
  await app.listen(3000);
}
bootstrap();
