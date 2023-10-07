import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
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

    const { tokenUrl } = this.configService.config;

    const { data } = await this.post(tokenUrl, formData);

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

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    const formData = new FormData();
    formData.append("token_type_hint", "refresh_token");
    formData.append("token", refreshToken);

    const { revocationUrl } = this.configService.config;

    await this.post(revocationUrl, formData);
  }

  private async post(url: string, formData: FormData): Promise<AxiosResponse> {
    const { clientId, secretKey } = this.configService.config;

    const auth = {
      username: clientId,
      password: secretKey,
    };

    const headers = {
      "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
    };

    return axios.post(url, formData, { auth, headers });
  }
}
