import { SsoTokens } from "../sso/dto/sso-tokens.dto";

export type EveAuthSsoLoginResult = {
  character: {
    id: number;
    name: string;
  };
  tokens: SsoTokens;
};

export interface EveAuthConsumerService {
  ssoLogin(loginResult: EveAuthSsoLoginResult): Promise<void>;
}
