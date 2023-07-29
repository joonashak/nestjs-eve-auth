import { Module } from "@nestjs/common";
import {
  ConfigurableEveAuthModule,
  EVE_AUTH_MODULE_OPTIONS_TOKEN,
} from "./eve-auth.module-definition";
import { SsoModule } from "./sso/sso.module";

@Module({
  imports: [SsoModule],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN],
})
export class EveAuthModule extends ConfigurableEveAuthModule {}
