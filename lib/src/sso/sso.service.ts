import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import * as FormData from "form-data";
import { EVE_AUTH_MODULE_OPTIONS_TOKEN } from "../constants";
import { ExpressSession } from "../utils/express-session";
import { CallbackParams } from "./dto/callback-params.dto";
import { SsoTokens } from "./dto/sso-tokens.dto";

@Injectable()
export class SsoService {
  constructor(
    @Inject(EVE_AUTH_MODULE_OPTIONS_TOKEN)
    private options: any,
  ) {}

  async callback(
    { code, state }: CallbackParams,
    session: ExpressSession,
  ): Promise<SsoTokens> {
    // FIXME: Access session state safely.
    const sessionState = session["oauth2:login.eveonline.com"].state;
    this.verifyState(state, sessionState);
    return this.getTokens(code);
  }

  private verifyState(callbackState: string, sessionState: string): boolean {
    if (callbackState !== sessionState) {
      throw new HttpException(
        "SSO states do not match.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  private async getTokens(code: string): Promise<SsoTokens> {
    const formData = new FormData();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);

    const { clientId, secretKey, tokenUrl } = this.options;

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
}
