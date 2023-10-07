import { Controller, Get, Query, Res, Session } from "@nestjs/common";
import { Response } from "express";
import {
  CurrentUserEsiId,
  EveSsoCallbackParams,
  RequireSsoAuth,
  SsoService,
} from "nestjs-eve-auth";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private ssoService: SsoService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @RequireSsoAuth()
  @Get("sso/login")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  // @UsePipes(ValidationPipe)
  // @UseFilters(HttpExceptionFilter)
  @Get("sso/callback")
  async callback(
    @Query() callbackParams: EveSsoCallbackParams,
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ) {
    const { tokens } = await this.ssoService.callback(callbackParams, session);
    session.refreshToken = tokens.refreshToken;
    response.redirect("/whoami");
  }

  @Get("whoami")
  whoami(@CurrentUserEsiId() id: number) {
    return "Logged in: " + id;
  }

  @Get("logout")
  async logout(@Session() session: Record<string, any>) {
    await this.ssoService.logout(session.refreshToken, session);
  }
}
