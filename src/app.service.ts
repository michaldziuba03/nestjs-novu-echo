import { Injectable } from '@nestjs/common';
import { PayloadSchema, Workflow } from './echo/workflow.decorator';
import { UserService } from './user/user.service';
import { ExecuteInput } from '@novu/echo';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  getHello(): string {
    return 'Hello World';
  }

  private getMessage(user: { id: string, name: string }) {
    return `Hello, ${user.name}. Your id is: ${user.id}`;
  }

  @Workflow('onboard', {
    payloadSchema: {
      type: 'object',
      properties: { userId: { type: 'string' } },
    },
    inputSchema: {
      type: 'object',
      properties: { showButton: { type: 'boolean' } },
    },
  })
  @PayloadSchema({
    type: 'object',
    properties: { userId: { type: 'string' }, promoCode: { type: 'string' } },
  })
  public async onboardWorkflow(
    event: ExecuteInput<{ userId: string }, unknown>,
  ) {
    await event.step.email('hello-email', async () => {
      const user = await this.userService.getUserById(event.payload.userId);
      return {
        body: this.getMessage(user),
        subject: 'Welcome message.',
      };
    });

    await event.step.sms('hello-sms', async () => {
      const user = await this.userService.getUserById(event.payload.userId);
      return {
        body: this.getMessage(user),
      };
    });
  }
}
