import { DynamicModule, Global, Module } from "@nestjs/common";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "./constants";
import { SsoModule } from "./sso/sso.module";

@Global()
@Module({
  imports: [SsoModule],
  exports: [EVE_AUTH_MODULE_OPTIONS_TOKEN],
})
export class EveAuthModule {
  static forRoot(opt: any): DynamicModule {
    console.log(opt);

    const oldOptions = {
      clientId: "asd",
      secretKey: "",
      callbackUrl: "",
      global: false,
      authorizationUrl: "asd",
      tokenUrl: "asd",
    };

    return {
      module: EveAuthModule,
      providers: [
        {
          provide: EVE_AUTH_MODULE_OPTIONS_TOKEN,
          useValue: oldOptions,
        },
      ],
    };
  }

  static forRootAsync(opt: any): DynamicModule {
    console.log(opt);

    const oldOptions = {
      clientId: "asd",
      secretKey: "",
      callbackUrl: "",
      global: false,
      authorizationUrl: "asd",
      tokenUrl: "asd",
    };

    return {
      module: EveAuthModule,
      imports: opt.imports || [],
      providers: [
        {
          provide: EVE_AUTH_MODULE_OPTIONS_TOKEN,
          useFactory: async (...args: any[]) => await opt.useFactory(...args),
          inject: opt.inject || [],
        },
      ],
    };
  }
}
