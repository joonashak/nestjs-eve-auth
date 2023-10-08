import { Injectable } from "@nestjs/common";
import {
  SsoStateMismatchException,
  ssoStateMismatchMessage,
} from "../exceptions/sso-state-mismatch.exception";
import { Logger } from "../logger/logger.service";
import { ExpressSession } from "../utils/express-session";
import { EveSsoCallbackParams } from "./dto/eve-sso-callback-params.dto";
import { EveSsoCallbackResult } from "./dto/eve-sso-callback-result.dto";
import { SsoTokens } from "./dto/sso-tokens.dto";
import { EveSsoService } from "./eve-sso.service";
import { SessionService } from "./session.service";

@Injectable()
export class SsoService {
  constructor(
    private logger: Logger,
    private sessionService: SessionService,
    private eveSsoService: EveSsoService,
  ) {}

  async callback(
    { code, state }: EveSsoCallbackParams,
    session: ExpressSession,
  ): Promise<EveSsoCallbackResult> {
    const sessionState = this.sessionService.getStateOrFail(session);
    this.verifyState(state, sessionState);
    const tokens = await this.eveSsoService.getTokens(code);
    const loginData = await this.eveSsoService.verifyAndDecodeSsoAccessToken(
      tokens.accessToken,
    );

    this.sessionService.setUserEsiId(session, loginData.CharacterID);

    return {
      tokens,
      character: {
        id: loginData.CharacterID,
        name: loginData.CharacterName,
      },
    };
  }

  private verifyState(callbackState: string, sessionState: string): boolean {
    if (callbackState !== sessionState) {
      this.logger.error(ssoStateMismatchMessage);
      throw new SsoStateMismatchException();
    }
    return true;
  }

  /**
   * Log out, destroying session and revoking SSO refresh token.
   */
  async logout(refreshToken: string, session: ExpressSession) {
    session.destroy();
    await this.eveSsoService.revokeRefreshToken(refreshToken);
  }

  /**
   * Refresh SSO tokens using refresh token.
   *
   * Note that the refresh token may change as well.
   */
  async refreshTokens(refreshToken: string): Promise<SsoTokens> {
    return this.eveSsoService.refreshTokens(refreshToken);
  }
}
