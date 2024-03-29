import { Injectable } from '@nestjs/common';
import { ExecuteInput } from '@novu/echo';
import { Workflow } from './workflow-registry';
import { UserService } from '../user/user.service';

@Injectable()
export class MyWorkflows {
  constructor(private readonly userService: UserService) {}

  @Workflow('comment-on-post')
  public async commentWorkflow(event: ExecuteInput<unknown, unknown>) {
    await event.step.email('weekly-comments', async () => {
      const user = await this.userService.getUserById('2003');

      return {
        body: 'Hello, ' + user.name,
        subject: 'Weekly comments',
      };
    });

    await event.step.sms('sms', async () => {
      const user = await this.userService.getUserById('2003');
      return {
        body: 'SMS to: ' + user.name,
      };
    });
  }

  @Workflow('like-on-post')
  public async likeOnPost(event: ExecuteInput<unknown, unknown>) {
    await event.step.sms('like-sms', async () => {
      const user = await this.userService.getUserById('2003');
      return {
        body: 'Hello, ' + user.name,
      };
    });
  }
}
