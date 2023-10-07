import { BadRequestException, Injectable } from "@nestjs/common";
import { Logger } from "../logger/logger.service";
import { ExpressSession } from "../utils/express-session";
import { EveSsoCallbackParams } from "./dto/eve-sso-callback-params.dto";
import { EveSsoCallbackResult } from "./dto/eve-sso-callback-result.dto";
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
      const message = "SSO states do not match.";
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    return true;
  }
}
