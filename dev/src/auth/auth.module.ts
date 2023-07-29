import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OAuthStrategy } from "./oauth.strategy";

@Module({
  imports: [PassportModule],
  providers: [OAuthStrategy],
})
export class AuthModule {}
