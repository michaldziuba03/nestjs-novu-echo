export interface IWorkflow {
  handler: any;
  name: string;
  parent: any;
}

export const workflows = new Set<IWorkflow>();

export function Workflow(workflowId: string) {
  return function (target: any, propertyKey: string) {
    const workflow: IWorkflow = {
      name: workflowId,
      handler: target[propertyKey],
      parent: target,
    };
    workflows.add(workflow);
  };
}
