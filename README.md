## Novu Echo NestJS module

Experimental NestJS module for [Novu Echo](https://docs.novu.co/echo/quickstart) (Novu Echo itself is currently in public Alpha).

```ts
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
        subject: 'Welcome email',
      };
    });

    await event.step.sms('hello-sms', async () => {
      const user = await this.userService.getUserById('2003');
      return {
        body: 'Hello, ' + user.name,
      };
    });
  }
}
```

> Example workflow

## License
Distributed under the MIT License. See `LICENSE` for more information.
