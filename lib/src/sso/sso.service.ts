import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import * as FormData from "form-data";
import { ConfigService } from "../config/config.service";
import { Logger } from "../logger/logger.service";
import { ExpressSession } from "../utils/express-session";
import { EveSsoCallbackParams } from "./dto/eve-sso-callback-params.dto";
import { EveSsoCallbackResult } from "./dto/eve-sso-callback-result.dto";
import { EveSsoVerifyTokenResponse } from "./dto/eve-sso-verify-token-response.dto";
import { SsoTokens } from "./dto/sso-tokens.dto";
import { SessionService } from "./session.service";

@Injectable()
export class SsoService {
  constructor(
    private logger: Logger,
    private configService: ConfigService,
    private sessionService: SessionService,
  ) {}

  async callback(
    { code, state }: EveSsoCallbackParams,
    session: ExpressSession,
  ): Promise<EveSsoCallbackResult> {
    const sessionState = this.sessionService.getStateOrFail(session);
    this.verifyState(state, sessionState);
    const tokens = await this.getTokens(code);
    const loginData = await this.verifyAndDecodeSsoAccessToken(
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

  private async getTokens(code: string): Promise<SsoTokens> {
    const formData = new FormData();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);

    const { clientId, secretKey, tokenUrl } = this.configService.config;

    const auth = {
      username: clientId,
      password: secretKey,
    };

    const headers = {
      "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
    };

    const { data } = await axios.post(tokenUrl, formData, { auth, headers });

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }

  /**
   * Verify JWT token through EVE SSO.
   *
   * Returns character data if the token is valid.
   */
  async verifyAndDecodeSsoAccessToken(
    token: string,
  ): Promise<EveSsoVerifyTokenResponse> {
    try {
      const { data } = await axios.get<EveSsoVerifyTokenResponse>(
        this.configService.config.verifyUrl,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return data;
    } catch {
      const message = "SSO token verification failed.";
      this.logger.error(message);
      throw new UnauthorizedException(message);
    }
  }
}
