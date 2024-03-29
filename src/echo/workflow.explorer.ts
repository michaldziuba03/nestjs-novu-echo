import { Echo, Execute } from '@novu/echo';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { WORKFLOW_HANDLER } from './echo.constants';
import { WorkflowMetadata } from './workflow.decorator';
import { InjectNovuEcho } from './echo.decorator';

@Injectable()
export class WorkflowExplorer implements OnModuleInit {
  private readonly logger = new Logger('NovuEchoModule');

  constructor(
    @InjectNovuEcho()
    private readonly echo: Echo,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    this.loadWorkflows();
  }

  private loadWorkflows() {
    const providers = this.discoveryService.getProviders();

    for (const wrapper of providers) {
      if (!wrapper.instance || wrapper.isAlias) {
        continue;
      }

      const { instance } = wrapper;
      const prototype = Object.getPrototypeOf(instance);
      const methods = this.metadataScanner.getAllMethodNames(prototype);
      this.findWorkflowHandlers(instance, methods);
    }
  }

  private findWorkflowHandlers(instance: any, methods: string[]) {
    for (const method of methods) {
      const handler = instance[method];
      const workflowMetadata = this.reflector.get<WorkflowMetadata>(
        WORKFLOW_HANDLER,
        handler,
      );

      if (!workflowMetadata) {
        continue;
      }

      this.registerWorkflow(workflowMetadata, handler, instance);
    }
  }

  private registerWorkflow(
    metadata: WorkflowMetadata,
    handler: Execute<unknown, unknown>,
    instance: object,
  ) {
    const exec = handler.bind(instance);
    this.echo.workflow(metadata.id, exec, metadata.options);
    this.logger.log(`Discovered workflowId: '${metadata.id}'`);
  }
}
