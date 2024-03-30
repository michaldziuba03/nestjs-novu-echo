import { SetMetadata } from '@nestjs/common';
import {
  WORKFLOW_HANDLER,
  WORKFLOW_INPUT,
  WORKFLOW_PAYLOAD,
} from './echo.constants';
import { WorkflowOptions } from '@novu/echo';

/**
 * `@Workflow` decorator metadata
 */
export interface WorkflowMetadata {
  id: string;
  options?: WorkflowOptions<unknown, unknown>;
}

/**
 * Define a new notification workflow.
 *
 * @param workflowId unique workflow id
 * @param options workflow options
 */
export function Workflow<TPayloadSchema = any, TInputSchema = any>(
  workflowId: string,
  options?: WorkflowOptions<TPayloadSchema, TInputSchema>,
) {
  const metadata: WorkflowMetadata = {
    id: workflowId,
    options: options || {},
  };

  return SetMetadata(WORKFLOW_HANDLER, metadata);
}

/**
 * Define a validation schema for workflow.
 * Will override `payloadSchema` option if definied in `@Workflow` decorator.
 *
 * @param schema
 */
export function PayloadSchema<T = any>(schema: T) {
  return SetMetadata(WORKFLOW_PAYLOAD, schema);
}

/**
 * Define a input schema for workflow.
 * Will override `inputSchema` option if definied in `@Workflow` decorator.
 *
 * @param schema
 */
export function InputSchema<T = any>(schema: T) {
  return SetMetadata(WORKFLOW_INPUT, schema);
}
