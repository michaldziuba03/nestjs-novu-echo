import { Module } from '@nestjs/common';
import { WorkflowExplorer } from './workflow.explorer';
import { DiscoveryModule } from '@nestjs/core';
import { createNovuEchoClient } from './echo.provider';

@Module({
  imports: [DiscoveryModule],
  providers: [WorkflowExplorer, createNovuEchoClient()],
})
export class NovuEchoModule {}
