import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import * as FormData from "form-data";
import { ConfigService } from "../config/config.service";
import { Logger } from "../logger/logger.service";
import { EveSsoVerifyTokenResponse } from "./dto/eve-sso-verify-token-response.dto";
import { SsoTokens } from "./dto/sso-tokens.dto";

@Injectable()
export class EveSsoService {
  constructor(private logger: Logger, private configService: ConfigService) {}

  async getTokens(code: string): Promise<SsoTokens> {
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
