import { ConfigurableModuleBuilder } from "@nestjs/common";
import configuration from "./configuration";

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
   * or the authentication will fail. The correct value should be your server
   * address appended with `/sso/callback`. E.g., when developing locally, this
   * could be `http://localhost:3000/sso/callback`.
   */
  callbackUrl: string;
  /**
   * Register `EveAuthModule` as global module.
   */
  global?: boolean;
  /**
   * EVE SSO Authorization URL.
   *
   * It is not necessary to set this in normal use. This option is provided for
   * redundancy.
   */
  authorizationUrl?: string;
  /**
   * EVE SSO Token URL.
   *
   * It is not necessary to set this in normal use. This option is provided for
   * redundancy.
   */
  tokenUrl?: string;
}

export const {
  ConfigurableModuleClass: ConfigurableEveAuthModule,
  MODULE_OPTIONS_TOKEN: EVE_AUTH_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<EveAuthModuleOptions>()
  .setClassMethodName("forRoot")
  .setExtras(
    {
      global: true,
      authorizationUrl: configuration.sso.authorizationUrl,
      tokenUrl: configuration.sso.tokenUrl,
    },
    (definition, extras) => {
      // Set options default values.
      // This is hacky but ConfigurableModuleBuilder does not provide a way to do this properly.
      try {
        definition.providers[0]["useValue"] = extras;
      } catch {
        throw new Error("Could not set `EveAuthModuleOptions` default values.");
      }

      return {
        ...definition,
        global: extras.global,
      };
    },
  )
  .build();
