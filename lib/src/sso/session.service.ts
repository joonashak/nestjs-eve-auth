import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Logger } from "../logger/logger.service";
import { ExpressSession } from "../utils/express-session";
import { SessionUtils } from "./session.utils";

const OAUTH_SESSION_KEY = "oauth2:login.eveonline.com";

/**
 * Encapsulation for session-related methods.
 *
 * This could eventually be used to support other session managers besides
 * express-session.
 */
@Injectable()
export class SessionService {
  constructor(private logger: Logger) {}

  /**
   * Get OAuth2 session state from `express-session` or throw if not found.
   */
  getStateOrFail(session: ExpressSession): string {
    const sessionState = session[OAUTH_SESSION_KEY].state || undefined;

    if (!sessionState) {
      const message = "Failed to read session state.";
      this.logger.error(message);
      throw new InternalServerErrorException(message);
    }

    return sessionState;
  }

  /**
   * Save user's ESI ID with `express-session`.
   */
  setUserEsiId(session: ExpressSession, userEsiId: number): void {
    if (Number.isNaN(userEsiId)) {
      const message = "Invalid ESI ID.";
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    SessionUtils.saveUserEsiId(session, userEsiId);
  }
}
