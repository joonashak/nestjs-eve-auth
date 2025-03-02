import { SsoTokens } from "./sso-tokens.dto";

/**
 * @group Types
 */
export class EveSsoCallbackResult {
  character: {
    id: number;
    name: string;
  };

  tokens: SsoTokens;
}
