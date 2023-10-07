import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "../config/config.module";
import { OAuthStrategy } from "./oauth.strategy";
import { SessionService } from "./session.service";
import { SsoService } from "./sso.service";

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [OAuthStrategy, SsoService, SessionService],
  exports: [SsoService],
})
export class SsoModule {}
