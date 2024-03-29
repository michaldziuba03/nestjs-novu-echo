import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NovuEchoModule } from './echo/echo.module';
import { MyWorkflows } from './echo/custom.step';
import { UserModule } from './user/user.module';

@Module({
  imports: [NovuEchoModule, UserModule],
  controllers: [AppController],
  providers: [AppService, MyWorkflows],
})
export class AppModule {}
