import { SetMetadata } from '@nestjs/common';
import { WORKFLOW_HANDLER } from './echo.constants';

/**
 * `@Workflow` decorator metadata
 */
export interface WorkflowMetadata {
  id: string;
  options?: object;
}

/**
 * Registers workflow handler.
 *
 * @param workflowId unique workflow id
 * @param options workflow options
 */
export function Workflow(workflowId: string, options?: object) {
  const metadata: WorkflowMetadata = {
    id: workflowId,
    options: options || {},
  };

  return SetMetadata(WORKFLOW_HANDLER, metadata);
}
