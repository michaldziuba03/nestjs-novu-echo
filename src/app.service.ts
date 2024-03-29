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

  @Workflow('onboard')
  public async onboardWorkflow(event: ExecuteInput<unknown, unknown>) {
    await event.step.email('hello-email', async () => {
      const user = await this.userService.getUserById('2003');
      return {
        body: 'Hello, ' + user.name,
        subject: 'Welcome to our services',
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
