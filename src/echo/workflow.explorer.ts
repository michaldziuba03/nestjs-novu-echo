import { Echo, Execute } from '@novu/echo';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  DiscoveryService,
  MetadataScanner,
  ModuleRef,
  Reflector,
} from '@nestjs/core';
import { ECHO_CLIENT, WORKFLOW_HANDLER } from './echo.constants';
import { WorkflowMetadata } from './workflow.decorator';

@Injectable()
export class WorkflowExplorer implements OnModuleInit {
  private readonly logger = new Logger('NovuEchoModule');

  constructor(
    private readonly moduleRef: ModuleRef,
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
    const echo = this.moduleRef.get<Echo>(ECHO_CLIENT);
    const exec = handler.bind(instance);

    echo.workflow(metadata.id, exec, metadata.options);

    this.logger.log(`Detected workflow: ${metadata.id}`);
  }
}
