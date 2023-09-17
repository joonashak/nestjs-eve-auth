import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import axios from "axios";
import * as FormData from "form-data";
import { ConfigService } from "../config/config.service";
import { Consumer } from "../config/consumer.service";
import { EVE_AUTH_SESSION_USER_ESI_ID_TOKEN } from "../constants";
import { ExpressSession } from "../utils/express-session";
import { CallbackParams } from "./dto/callback-params.dto";
import { EveSsoVerifyTokenResponse } from "./dto/eve-sso-verify-token-response.dto";
import { SsoTokens } from "./dto/sso-tokens.dto";

@Injectable()
export class SsoService {
  private readonly logger = new Logger(SsoService.name);

  constructor(
    private configService: ConfigService,
    private consumer: Consumer,
  ) {}

  async callback(
    { code, state }: CallbackParams,
    session: ExpressSession,
  ): Promise<void> {
    // FIXME: Access session state safely.
    const sessionState = session["oauth2:login.eveonline.com"].state;
    this.verifyState(state, sessionState);
    const tokens = await this.getTokens(code);
    const loginData = await this.verifyAndDecodeSsoAccessToken(
      tokens.accessToken,
    );

    await this.consumer.service.ssoLogin({
      tokens,
      character: {
        id: loginData.CharacterID,
        name: loginData.CharacterName,
      },
    });

    session[EVE_AUTH_SESSION_USER_ESI_ID_TOKEN] = loginData.CharacterID;
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
