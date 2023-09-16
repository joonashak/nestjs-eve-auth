import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "../constants";

export const OAUTH_STRATEGY_TOKEN = "eve-oauth";

@Injectable()
export class OAuthStrategy extends PassportStrategy(
  Strategy,
  OAUTH_STRATEGY_TOKEN,
) {
  constructor(@Inject(EVE_AUTH_MODULE_OPTIONS_TOKEN) options: any) {
    super({
      authorizationURL: options.authorizationUrl,
      tokenURL: options.tokenUrl,
      clientID: options.clientId,
      clientSecret: options.secretKey,
      callbackURL: options.callbackUrl,
      state: true,
    });
  }
}
