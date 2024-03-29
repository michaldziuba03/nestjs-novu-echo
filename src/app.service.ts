import { Injectable } from '@nestjs/common';
import { Workflow } from './echo/workflow.decorator';
import { UserService } from './user/user.service';
import { ExecuteInput } from '@novu/echo';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Workflow('onboard', {
    payloadSchema: { properties: { userId: { type: 'string' } } },
  })
  public async onboardWorkflow(
    event: ExecuteInput<{ userId: string }, unknown>,
  ) {
    await event.step.email('hello-email', async () => {
      const user = await this.userService.getUserById(event.payload.userId);
      return {
        body: 'Hello, ' + user.name,
        subject: 'Welcome to our services, you are user with id: ' + user.id,
      };
    });

    await event.step.sms('sms', async () => {
      const user = await this.userService.getUserById('2003');
      return {
        body: 'Hello, ' + user.name,
      };
    });
  }
}
