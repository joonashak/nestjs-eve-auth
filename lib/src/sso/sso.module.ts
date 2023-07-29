import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OAuthStrategy } from "./oauth.strategy";
import { SsoController } from "./sso.controller";

@Module({
  imports: [PassportModule],
  providers: [OAuthStrategy],
  controllers: [SsoController],
})
export class SsoModule {}
