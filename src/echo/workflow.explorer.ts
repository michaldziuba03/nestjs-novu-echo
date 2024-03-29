import { Echo, Execute } from '@novu/echo';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  WORKFLOW_HANDLER,
  WORKFLOW_INPUT,
  WORKFLOW_PAYLOAD,
} from './echo.constants';
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

    const options = metadata.options || {};
    const inputSchema = this.reflector.get(WORKFLOW_INPUT, handler);
    const payloadSchema = this.reflector.get(WORKFLOW_PAYLOAD, handler);

    if (inputSchema) {
      options.inputSchema = inputSchema;
    }

    if (payloadSchema) {
      options.payloadSchema = payloadSchema;
    }

    this.echo.workflow(metadata.id, exec, options);
    this.logger.log(`Discovered workflowId: '${metadata.id}'`);
  }
}
