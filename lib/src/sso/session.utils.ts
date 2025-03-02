import { EVE_AUTH_SESSION_KEY, EVE_AUTH_SESSION_USER_ESI_ID_KEY } from "../constants";
import { ExpressSession } from "../utils/express-session";

export class SessionUtils {
  static getUserEsiId(session: ExpressSession): number | undefined {
    return session[EVE_AUTH_SESSION_KEY]?.[EVE_AUTH_SESSION_USER_ESI_ID_KEY] || undefined;
  }

  static saveUserEsiId(session: ExpressSession, userEsiId: number): void {
    session[EVE_AUTH_SESSION_KEY] = {
      [EVE_AUTH_SESSION_USER_ESI_ID_KEY]: userEsiId,
    };
  }
}
