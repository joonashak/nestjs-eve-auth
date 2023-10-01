import {
  Controller,
  Get,
  Query,
  Res,
  Session,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { HttpExceptionFilter } from "../common/filters/http-exception.filter";
import { ConfigService } from "../config/config.service";
import { ExpressSession } from "../utils/express-session";
import { EveSsoCallbackParams } from "./dto/eve-sso-callback-params.dto";
import { SsoService } from "./sso.service";

// FIXME: Remove this when implemented in nestjs-clone-bay.
/**
 * Declare endpoints for SSO authentication requests.
 *
 * - _/sso/login_ - Redirect to EVE SSO login page.
 * - _/sso/callback_ - SSO callback endpoint. Client should be redirected to
 * this after successful authentication.
 *
 * The endpoint paths are hardcoded because Nest.js does not provide dynamic
 * routing and implementing it manually takes some work. If this is a problem,
 * please open an issue.
 */
@Controller("sso")
export class SsoController {
  constructor(
    private ssoService: SsoService,
    private configService: ConfigService,
  ) {}

  // @UseGuards(AuthGuard(OAUTH_STRATEGY_TOKEN))
  // @Get("login")
  // async login() {}

  @UsePipes(ValidationPipe)
  @UseFilters(HttpExceptionFilter)
  @Get("callback")
  async callback(
    @Query() callbackParams: EveSsoCallbackParams,
    @Session() session: ExpressSession,
    @Res() response: Response,
  ) {
    await this.ssoService.callback(callbackParams, session);
    response.redirect(this.configService.config.afterLoginUrl);
  }
}
