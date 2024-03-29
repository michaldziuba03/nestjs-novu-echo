import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

@Injectable()
export class WorkflowsLoader {
  constructor(private readonly discoveryService: DiscoveryService) {}

  getParent(token: any) {
    return this.discoveryService
      .getProviders()
      .find((provider) => provider.token === token.constructor);
  }
}
