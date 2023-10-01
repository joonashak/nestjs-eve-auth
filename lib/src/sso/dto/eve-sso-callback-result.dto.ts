import { SsoTokens } from "./sso-tokens.dto";

export type EveSsoCallbackResult = {
  character: {
    id: number;
    name: string;
  };
  tokens: SsoTokens;
};
