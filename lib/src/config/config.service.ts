import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { validateSync } from "class-validator";
import { EveAuthModuleOptions } from "../eve-auth-module-options.interface";
import { EveAuthModule } from "../eve-auth.module";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "../eve-auth.module-definition";
import { Config } from "./config.model";

@Injectable()
export class ConfigService {
  public readonly config: Config;
  private logger = new Logger(EveAuthModule.name);

  constructor(
    @Inject(EVE_AUTH_MODULE_OPTIONS_TOKEN) options: EveAuthModuleOptions,
  ) {
    this.config = new Config(options);
    const errors = validateSync(this.config);

    if (errors.length) {
      this.logger.error("Bad configuration");
      this.logger.error(errors);
      throw new InternalServerErrorException(
        "nestjs-eve-auth is not correctly configured.",
      );
    }
  }
}
