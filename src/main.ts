import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Echo } from '@novu/echo';
import { serve } from '@novu/echo/express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { injectNovuEcho } from './echo/echo.provider';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const echo = app.get<Echo>(injectNovuEcho());
  app.useBodyParser('json', { limit: '10mb' });
  app.use('/api/echo', serve({ client: echo }));
  await app.listen(3000);
}
bootstrap();
