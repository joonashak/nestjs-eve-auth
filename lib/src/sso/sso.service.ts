import { Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import * as FormData from "form-data";
import {
  EVE_AUTH_MODULE_OPTIONS_TOKEN,
  EveAuthModuleOptions,
} from "../eve-auth.module-definition";
import { CallbackParams } from "./dto/callback-params.dto";
import { SsoTokens } from "./dto/sso-tokens.dto";

@Injectable()
export class SsoService {
  constructor(
    @Inject(EVE_AUTH_MODULE_OPTIONS_TOKEN)
    private options: EveAuthModuleOptions,
  ) {}

  async callback({ code, state }: CallbackParams): Promise<SsoTokens> {
    return this.getTokens(code);
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
