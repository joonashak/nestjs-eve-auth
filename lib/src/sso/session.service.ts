import { Injectable } from "@nestjs/common";
import {
  InvalidEsiIdException,
  invalidEsiIdMessage,
} from "../exceptions/invalid-esi-id.exception";
import {
  SessionStateNotFound,
  sessionStateNotFoundMessage,
} from "../exceptions/session-state-not-found.exception";
import { Logger } from "../logger/logger.service";
import { ExpressSession } from "../utils/express-session";
import { SessionUtils } from "./session.utils";

export const OAUTH_SESSION_KEY = "oauth2:login.eveonline.com";

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
    const sessionState = session[OAUTH_SESSION_KEY]?.state;

    if (!sessionState) {
      this.logger.error(sessionStateNotFoundMessage);
      throw new SessionStateNotFound();
    }

    return sessionState;
  }

  /**
   * Save user's ESI ID with `express-session`.
   */
  setUserEsiId(session: ExpressSession, userEsiId: number): void {
    if (Number.isNaN(userEsiId)) {
      this.logger.error(invalidEsiIdMessage);
      throw new InvalidEsiIdException();
    }

    SessionUtils.saveUserEsiId(session, userEsiId);
  }
}
