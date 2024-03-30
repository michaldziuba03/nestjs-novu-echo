import { Module } from '@nestjs/common';
import { WorkflowExplorer } from './workflow.explorer';
import { DiscoveryModule } from '@nestjs/core';
import { createNovuEchoClient } from './echo.provider';
import {
  NovuEchoBaseModule,
  OPTIONS_TYPE as NovuEchoOptions,
  ASYNC_OPTIONS_TYPE as NovuEchoAsyncOptions,
} from './echo-base.module';

@Module({})
export class NovuEchoModule extends NovuEchoBaseModule {
  static forRoot(options: typeof NovuEchoOptions) {
    const echoProvider = createNovuEchoClient();
    const module = super.forRoot(options);

    module.imports = [DiscoveryModule];
    module.providers.push(echoProvider, WorkflowExplorer);
    module.exports = [echoProvider];

    return module;
  }

  static forRootAsync(options: typeof NovuEchoAsyncOptions) {
    const echoProvider = createNovuEchoClient();
    const module = super.forRootAsync(options);

    module.imports = [DiscoveryModule];
    module.providers.push(echoProvider, WorkflowExplorer);
    module.exports = [echoProvider];

    return module;
  }
}
