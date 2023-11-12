import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import {
  ConfigurableEveAuthModule,
  EVE_AUTH_MODULE_OPTIONS_TOKEN,
} from "./eve-auth.module-definition";
import { SsoModule } from "./sso/sso.module";

/** @group Modules */
@Global()
@Module({
  imports: [ConfigModule, SsoModule],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN, SsoModule],
})
export class EveAuthModule extends ConfigurableEveAuthModule {}
