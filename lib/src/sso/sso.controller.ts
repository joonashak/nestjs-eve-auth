import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import configuration from "../configuration";
import { OAUTH_STRATEGY_TOKEN } from "./oauth.strategy";

@Controller()
export class SsoController {
  @UseGuards(AuthGuard(OAUTH_STRATEGY_TOKEN))
  @Get(configuration.sso.loginPath)
  login() {}

  @Get(configuration.sso.callbackPath)
  callback(@Query("code") code: string, @Query("state") state: string) {
    // TODO: Verify state.
    // TODO: Get tokens.
    return {
      code,
      state,
    };
  }
}
