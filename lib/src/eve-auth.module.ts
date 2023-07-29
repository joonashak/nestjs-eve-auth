import { Module } from "@nestjs/common";
import configuration from "./configuration";
import {
  ConfigurableEveAuthModule,
  EVE_AUTH_MODULE_OPTIONS_TOKEN,
} from "./eve-auth.module-definition";
import { SsoModule } from "./sso/sso.module";

@Module({
  //FIXME: Make this configurable by consumer. Ditch ConfigurableModuleBuilder?
  imports: [SsoModule.register(configuration.sso.loginPath)],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN],
})
export class EveAuthModule extends ConfigurableEveAuthModule {}
