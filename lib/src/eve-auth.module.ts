import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "./constants";
import { EveAuthModuleAsyncOptions } from "./interfaces/eve-auth-module-async-options.interface";
import { SsoService } from "./sso";
import { SsoModule } from "./sso/sso.module";

@Global()
@Module({
  imports: [ConfigModule, SsoModule],
  providers: [SsoService],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN, SsoService],
})
export class EveAuthModule {
  static forRootAsync(opt: EveAuthModuleAsyncOptions): DynamicModule {
    return {
      module: EveAuthModule,
      imports: opt.imports || [],
      providers: [
        {
          provide: EVE_AUTH_MODULE_OPTIONS_TOKEN,
          useFactory: async (...args) => {
            const options = await opt.useFactory(...args);
            return options;
          },
          inject: opt.inject || [],
        },
      ],
    };
  }
}
