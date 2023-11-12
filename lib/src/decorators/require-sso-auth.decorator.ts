import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OAUTH_STRATEGY_TOKEN } from "../constants";

/** @group Decorators */
export const RequireSsoAuth = () =>
  applyDecorators(UseGuards(AuthGuard(OAUTH_STRATEGY_TOKEN)));
