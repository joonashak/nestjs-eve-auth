import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import {
  ConfigurableEveAuthModule,
  EVE_AUTH_MODULE_OPTIONS_TOKEN,
} from "./eve-auth.module-definition";
import { SsoModule } from "./sso/sso.module";

/**
 * Main module of `nestjs-eve-auth` library.
 *
 * Provides configuration to the library and exports its public API. You can
 * import this simply in your application's root module or encapsulate it in
 * another module.
 *
 * @property forRoot Configure `nestjs-eve-auth` and return the module for
 *   importing in a Nest.js module definition. See [configuration
 *   docs](https://joonashak.github.io/nestjs-eve-auth/usage/configuration.html).
 * @property forRootAsync Configure `nestjs-eve-auth` asynchronously and return
 *   the module for importing in a Nest.js module definition. See [configuration
 *   docs](https://joonashak.github.io/nestjs-eve-auth/usage/configuration.html).
 * @group Modules
 */
@Global()
@Module({
  imports: [ConfigModule, SsoModule],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN, SsoModule],
})
export class EveAuthModule extends ConfigurableEveAuthModule {}
