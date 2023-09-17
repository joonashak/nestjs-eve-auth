import { Inject, Injectable } from "@nestjs/common";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "../constants";
import { EveAuthModuleOptions } from "../interfaces/eve-auth-module-options.interface";
import { EveAuthUserService } from "../interfaces/user-service.interface";

@Injectable()
export class Consumer {
  public readonly userService: EveAuthUserService;

  constructor(
    @Inject(EVE_AUTH_MODULE_OPTIONS_TOKEN) options: EveAuthModuleOptions,
  ) {
    this.userService = options.userService;
  }
}
