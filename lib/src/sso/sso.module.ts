import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OAuthStrategy } from "./oauth.strategy";
import { SsoService } from "./sso.service";

@Module({
  imports: [PassportModule],
  providers: [OAuthStrategy, SsoService],
  exports: [SsoService],
})
export class SsoModule {}
