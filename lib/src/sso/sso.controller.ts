import {
  Controller,
  Get,
  Query,
  Session,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HttpExceptionFilter } from "../common/filters/http-exception.filter";
import configuration from "../configuration";
import { ExpressSession } from "../utils/express-session";
import { CallbackParams } from "./dto/callback-params.dto";
import { OAUTH_STRATEGY_TOKEN } from "./oauth.strategy";
import { SsoService } from "./sso.service";

@Controller()
export class SsoController {
  constructor(private ssoService: SsoService) {}

  @UseGuards(AuthGuard(OAUTH_STRATEGY_TOKEN))
  // FIXME: Move this under configuration. See https://github.com/nestjs/nest/issues/1438#issuecomment-872012841
  @Get(configuration.sso.loginPath)
  login() {}

  @UsePipes(ValidationPipe)
  @UseFilters(HttpExceptionFilter)
  @Get(configuration.sso.callbackPath)
  callback(
    @Query() callbackParams: CallbackParams,
    @Session() session: ExpressSession,
  ) {
    return this.ssoService.callback(callbackParams, session);
  }
}
