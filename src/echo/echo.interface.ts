import { ClientConfig } from '@novu/echo';

export interface NovuEchoOptions {
  config: ClientConfig;
  endpoint?: string; // idk, maybe for the future?
}
