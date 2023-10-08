import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import * as FormData from "form-data";
import { ConfigService } from "../config/config.service";
import { InvalidRefreshTokenException } from "../exceptions/invalid-refresh-token.exception";
import { UnknownException } from "../exceptions/unknown.exception";
import { Logger } from "../logger/logger.service";
import { EveSsoVerifyTokenResponse } from "./dto/eve-sso-verify-token-response.dto";
import { SsoTokens } from "./dto/sso-tokens.dto";

@Injectable()
export class EveSsoService {
  constructor(private logger: Logger, private configService: ConfigService) {}

  /**
   * Get SSO tokens from EVE SSO API using authorization code.
   */
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
   * Refresh SSO tokens using refresh token.
   *
   * Note that the refresh token may change as well.
   */
  async refreshTokens(refreshToken: string): Promise<SsoTokens> {
    const formData = new FormData();
    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", refreshToken);

    const { tokenUrl } = this.configService.config;

    try {
      const { data } = await this.post(tokenUrl, formData);

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    } catch (error) {
      if (error.response.status === 400) {
        throw new InvalidRefreshTokenException();
      }
      throw new UnknownException(error);
    }
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

  /**
   * Revoke SSO refresh token.
   *
   * EVE SSO API will respond with 200 regardless of whether or not the token was
   * actually revoked or not found.
   */
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
