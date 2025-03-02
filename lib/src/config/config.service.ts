import { Inject, Injectable } from "@nestjs/common";
import { validateSync } from "class-validator";
import { EveAuthModuleOptions } from "../eve-auth-module-options.interface";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "../eve-auth.module-definition";
import { InvalidConfigurationException } from "../exceptions/invalid-configuration.exception";
import { Config } from "./config.model";

@Injectable()
export class ConfigService {
  public readonly config: Config;

  constructor(@Inject(EVE_AUTH_MODULE_OPTIONS_TOKEN) options: EveAuthModuleOptions) {
    this.config = new Config(options);
    // Running validation here ensures that execution is stopped immediately upon bad config.
    const errors = validateSync(this.config);

    if (errors.length) {
      throw new InvalidConfigurationException();
    }
  }
}
