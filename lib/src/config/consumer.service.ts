import { Inject, Injectable } from "@nestjs/common";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "../constants";
import { EveAuthConsumerService } from "../interfaces/eve-auth-consumer-service.interface";
import { EveAuthModuleOptions } from "../interfaces/eve-auth-module-options.interface";

@Injectable()
export class Consumer {
  public readonly service: EveAuthConsumerService;

  constructor(
    @Inject(EVE_AUTH_MODULE_OPTIONS_TOKEN) options: EveAuthModuleOptions,
  ) {
    this.service = options.service;
  }
}
