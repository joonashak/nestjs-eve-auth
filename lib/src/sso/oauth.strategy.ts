import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { ConfigService } from "../config/config.service";
import { OAUTH_STRATEGY_TOKEN } from "../constants";

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, OAUTH_STRATEGY_TOKEN) {
  constructor({ config }: ConfigService) {
    super({
      authorizationURL: config.authorizationUrl,
      tokenURL: config.tokenUrl,
      clientID: config.clientId,
      clientSecret: config.secretKey,
      callbackURL: config.callbackUrl,
      state: true,
      scope: config.scopes,
    });
  }
}
