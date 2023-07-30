import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OAuthStrategy } from "./oauth.strategy";
import { SsoController } from "./sso.controller";
import { SsoService } from "./sso.service";

@Module({
  imports: [PassportModule],
  providers: [OAuthStrategy, SsoService],
  controllers: [SsoController],
})
export class SsoModule {}
