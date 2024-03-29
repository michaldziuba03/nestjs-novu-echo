import { Inject } from '@nestjs/common';
import { injectNovuEcho } from './echo.provider';

export const InjectNovuEcho = () => {
  const token = injectNovuEcho();
  return Inject(token);
};
