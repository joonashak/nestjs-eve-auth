import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OAUTH_STRATEGY_TOKEN } from "./oauth.strategy";

export const createSsoController = (loginPath: string) => {
  @Controller()
  class SsoController {
    @UseGuards(AuthGuard(OAUTH_STRATEGY_TOKEN))
    @Get(loginPath)
    login() {}
  }
  return SsoController;
};
