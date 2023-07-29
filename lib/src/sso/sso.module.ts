import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OAuthStrategy } from "./oauth.strategy";
import { createSsoController } from "./sso.controller";

@Module({})
export class SsoModule {
  static register(url: string) {
    return {
      module: SsoModule,
      imports: [PassportModule],
      providers: [OAuthStrategy],
      controllers: [createSsoController(url)],
    };
  }
}
