import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NovuEchoOptions } from './echo.interface';

// use ConfigurableModuleBuilder, because building dynamic modules from scratch is painful
export const {
  ConfigurableModuleClass: NovuEchoBaseModule,
  MODULE_OPTIONS_TOKEN: ECHO_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<NovuEchoOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createNovuEchoOptions')
  .setExtras((definition) => ({
    ...definition,
    isGlobal: true,
  }))
  .build();
