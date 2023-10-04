import { ConfigurableModuleBuilder } from "@nestjs/common";
import { EveAuthModuleOptions } from "./eve-auth-module-options.interface";

export const {
  ConfigurableModuleClass: ConfigurableEveAuthModule,
  MODULE_OPTIONS_TOKEN: EVE_AUTH_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<EveAuthModuleOptions>({
  moduleName: "EveAuthModule",
  optionsInjectionToken: "EVE_AUTH_MODULE_OPTIONS",
})
  .setClassMethodName("forRoot")
  .build();
