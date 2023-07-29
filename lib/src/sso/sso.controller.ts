import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import configuration from "../configuration";
import { OAUTH_STRATEGY_TOKEN } from "./oauth.strategy";

@Controller()
export class SsoController {
  @UseGuards(AuthGuard(OAUTH_STRATEGY_TOKEN))
  @Get(configuration.sso.loginPath)
  login() {}
}
