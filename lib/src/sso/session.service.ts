import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
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

/**
 * Encapsulation for session-related methods.
 *
 * This could eventually be used to support other session managers besides
 * express-session.
 */
@Injectable()
export class SessionService {
  constructor(private logger: Logger, private configService: ConfigService) {}

  /** Get OAuth2 session state from `express-session` or throw if not found. */
  getStateOrFail(session: ExpressSession): string {
    const sessionState = session[this.getOAuthSessionKey()]?.state;

    if (!sessionState) {
      this.logger.error(sessionStateNotFoundMessage);
      throw new SessionStateNotFound();
    }

    return sessionState;
  }

  /**
   * Get session key used by Passport OAuth2.
   *
   * The OAuth2 strategy uses the authorization URL's hostname in the session
   * key. This method recreates the key using the configured authorization URL.
   * Note that port is not included in the key.
   */
  getOAuthSessionKey(): string {
    const match = this.configService.config.authorizationUrl.match(
      /^(?:https{0,1}:\/\/)(?<host>[\w\d.-]*)/,
    );

    const host = match.groups.host || "login.eveonline.com";
    return `oauth2:${host}`;
  }

  /** Save user's ESI ID with `express-session`. */
  setUserEsiId(session: ExpressSession, userEsiId: number): void {
    if (Number.isNaN(userEsiId)) {
      this.logger.error(invalidEsiIdMessage);
      throw new InvalidEsiIdException();
    }

    SessionUtils.saveUserEsiId(session, userEsiId);
  }
}
