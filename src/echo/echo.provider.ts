import { Provider } from '@nestjs/common';
import { ECHO_CLIENT } from './echo.constants';
import { Echo } from '@novu/echo';

export function injectNovuEcho() {
  return ECHO_CLIENT;
}

export function createNovuEchoClient(): Provider {
  return {
    //inject: [ECHO_OPTIONS],
    provide: ECHO_CLIENT,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    useFactory(options: object) {
      return new Echo({ devModeBypassAuthentication: true });
    },
  };
}
