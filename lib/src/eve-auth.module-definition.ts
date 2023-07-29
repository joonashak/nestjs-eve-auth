import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface EveAuthModuleOptions {
  clientId: string;
  secretKey: string;
}

export const {
  ConfigurableModuleClass: ConfigurableEveAuthModule,
  MODULE_OPTIONS_TOKEN: EVE_AUTH_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<EveAuthModuleOptions>().build();
