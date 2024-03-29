import { SetMetadata } from '@nestjs/common';
import { WORKFLOW_HANDLER } from './echo.constants';
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
