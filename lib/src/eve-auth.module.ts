import { DynamicModule, Global, Module } from "@nestjs/common";
import configuration from "./configuration";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "./constants";
import { EveAuthModuleAsyncOptions } from "./interfaces/eve-auth-module-async-options.interface";
import { SsoModule } from "./sso/sso.module";

@Global()
@Module({
  imports: [SsoModule],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN],
})
export class EveAuthModule {
  static forRootAsync(opt: EveAuthModuleAsyncOptions): DynamicModule {
    const config = {
      authorizationUrl: configuration.sso.authorizationUrl,
      tokenUrl: configuration.sso.tokenUrl,
    };

    return {
      module: EveAuthModule,
      imports: opt.imports || [],
      providers: [
        {
          provide: EVE_AUTH_MODULE_OPTIONS_TOKEN,
          // FIXME: Make a config module that exports the return type
          // of this function (e.g. EveAuthConfig) and offers a nice service
          // to avoid using the options injection token all the time.
          useFactory: async (...args) => {
            const options = await opt.useFactory(...args);
            return { ...config, ...options };
          },
          inject: opt.inject || [],
        },
      ],
    };
  }
}
