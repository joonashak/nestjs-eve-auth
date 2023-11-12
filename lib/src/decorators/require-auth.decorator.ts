import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";

/**
 * Require authentication by `nestjs-eve-auth` to use decorated entity.
 *
 * @group Decorators
 */
export const RequireAuth = () => applyDecorators(UseGuards(AuthGuard));
