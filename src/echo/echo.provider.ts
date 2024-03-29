import { Provider } from '@nestjs/common';
import { Echo } from '@novu/echo';

const token = Symbol('NOVU_ECHO_PROVIDER');

export function getEchoToken() {
  return token;
}

export function createEchoProvider(): Provider {
  return {
    provide: getEchoToken(),
    inject: [],
    useFactory: () => {
      const echo = new Echo({
        devModeBypassAuthentication: true,
      });

      return echo;
    },
  };
}
