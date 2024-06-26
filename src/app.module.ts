import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NovuEchoModule } from './echo/echo.module';

@Module({
  imports: [
    NovuEchoModule.forRoot({
      config: {
        devModeBypassAuthentication: true,
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
