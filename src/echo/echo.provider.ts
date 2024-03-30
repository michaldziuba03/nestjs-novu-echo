import type { NovuEchoOptions } from './echo.interface';
import { Provider } from '@nestjs/common';
import { ECHO_CLIENT, ECHO_OPTIONS } from './echo.constants';
import { Echo } from '@novu/echo';

export function injectNovuEcho() {
  return ECHO_CLIENT;
}

export function createNovuEchoClient(): Provider {
  return {
    inject: [ECHO_OPTIONS],
    provide: ECHO_CLIENT,
    useFactory(options: NovuEchoOptions) {
      return new Echo(options.config);
    },
  };
}
