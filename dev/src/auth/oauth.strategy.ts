import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import OAuth2Strategy from "passport-oauth2";

@Injectable()
export class OAuthStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor() {
    super({
      authorizationURL: "https://login.eveonline.com/v2/oauth/authorize",
      tokenURL: "https://login.eveonline.com/v2/oauth/token",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET_KEY,
      callbackURL: "http://localhost:3000/callback",
      state: true,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    callback: any,
  ) {
    console.log("validate()");
    return { user: "test" };
  }
}
