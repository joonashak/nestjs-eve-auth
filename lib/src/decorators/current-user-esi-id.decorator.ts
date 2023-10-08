import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { SessionUtils } from "../sso";

/**
 * Parameter decorator to get current user's ESI ID.
 */
export const CurrentUserEsiId = createParamDecorator(
  (_, context: ExecutionContext): number | undefined => {
    const { session } = context.switchToHttp().getRequest();
    const userEsiId = SessionUtils.getUserEsiId(session);

    if (!userEsiId) {
      return undefined;
    }

    return Number(userEsiId);
  },
);
