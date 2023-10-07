import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "../config/config.module";
import { LoggerModule } from "../logger/logger.module";
import { EveSsoService } from "./eve-sso.service";
import { OAuthStrategy } from "./oauth.strategy";
import { SessionService } from "./session.service";
import { SsoService } from "./sso.service";

@Module({
  imports: [PassportModule, ConfigModule, LoggerModule],
  providers: [OAuthStrategy, SsoService, SessionService, EveSsoService],
  exports: [SsoService],
})
export class SsoModule {}
