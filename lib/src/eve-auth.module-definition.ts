import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface EveAuthModuleOptions {
  /**
   * Your app's EVE SSO Client ID.
   */
  clientId: string;
  /**
   * Your app's EVE SSO Secret Key.
   */
  secretKey: string;
  /**
   * Your app's EVE SSO Callback URL.
   *
   * This MUST match what you have entered in your app's EVE SSO configuration
   * or the authentication will fail.
   */
  callbackUrl: string;
  /**
   * Register `EveAuthModule` as global module.
   */
  global?: boolean;
}

export const {
  ConfigurableModuleClass: ConfigurableEveAuthModule,
  MODULE_OPTIONS_TOKEN: EVE_AUTH_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<EveAuthModuleOptions>()
  .setClassMethodName("forRoot")
  .setExtras(
    {
      global: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.global,
    }),
  )
  .build();
