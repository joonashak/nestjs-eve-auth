import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import configuration from "../configuration";
import { OAUTH_STRATEGY_TOKEN } from "./oauth.strategy";
import { SsoService } from "./sso.service";

@Controller()
export class SsoController {
  constructor(private ssoService: SsoService) {}

  @UseGuards(AuthGuard(OAUTH_STRATEGY_TOKEN))
  @Get(configuration.sso.loginPath)
  login() {}

  @Get(configuration.sso.callbackPath)
  callback(@Query("code") code: string, @Query("state") state: string) {
    // TODO: Verify state.
    return this.ssoService.callback({ code, state });
  }
}
