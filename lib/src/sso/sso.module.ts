import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "../config/config.module";
import { OAuthStrategy } from "./oauth.strategy";
import { SsoService } from "./sso.service";

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [OAuthStrategy, SsoService],
  exports: [SsoService],
})
export class SsoModule {}
