import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import {
  EVE_AUTH_SESSION_KEY,
  EVE_AUTH_SESSION_USER_ESI_ID_KEY,
} from "../constants";

/**
 * Parameter decorator to get current user's ESI ID.
 */
export const CurrentUserEsiId = createParamDecorator(
  (_, context: ExecutionContext): number | undefined => {
    const request = context.switchToHttp().getRequest();
    const userEsiId =
      request.session[EVE_AUTH_SESSION_KEY]?.[EVE_AUTH_SESSION_USER_ESI_ID_KEY];

    if (!userEsiId) {
      return undefined;
    }

    return Number(userEsiId);
  },
);
