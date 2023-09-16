import { DynamicModule, Global, Module } from "@nestjs/common";
import configuration from "./configuration";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "./constants";
import { SsoModule } from "./sso/sso.module";

@Global()
@Module({
  imports: [SsoModule],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN],
})
export class EveAuthModule {
  static forRootAsync(opt: any): DynamicModule {
    console.log("forRootAsync", opt);
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
          // useFactory: async (...args: any[]) => await opt.useFactory(...args),
          useFactory: async (...args: any[]) => {
            const options = await opt.useFactory(...args);
            return { ...config, ...options };
          },
          inject: opt.inject || [],
        },
      ],
    };
  }
}
