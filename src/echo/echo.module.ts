import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef, DiscoveryModule } from '@nestjs/core';
import { Echo } from '@novu/echo';
import { workflows } from './workflow-registry';
import { createEchoProvider, getEchoToken } from './echo.provider';
import { WorkflowsLoader } from './workflow-loader';

@Module({
  imports: [DiscoveryModule],
  providers: [createEchoProvider(), WorkflowsLoader],
})
@Global()
export class NovuEchoModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onModuleInit() {
    const loader = this.moduleRef.get(WorkflowsLoader);
    const echo: Echo = this.moduleRef.get(getEchoToken());

    for (const workflow of workflows) {
      const parentInstance = loader.getParent(workflow.parent).instance;
      Logger.log(`Define workflow: ${workflow.name}`);
      echo.workflow(workflow.name, async function (ev) {
        const cb = workflow.handler.bind(parentInstance);
        const result = await cb(ev);
        return result;
      });
    }
  }
}
