import { Config } from "../config/config.model";
import { ConfigService } from "../config/config.service";
import { provideMockService } from "./mock-services";

export const defaultMockConfiguration: Config = {
  clientId: "n0284f03b74q",
  secretKey: "+9nfbu34b937vr85-3d",
  callbackUrl: "https://example.com/callback",
  scopes: ["test-scope-1", "test-scope-2"],
  authorizationUrl: "https://example.com/v2/oauth/authorize",
  tokenUrl: "https://example.com/v2/oauth/token",
  verifyUrl: "https://example.com/oauth/verify",
  revocationUrl: "https://example.com/v2/oauth/revoke",
};

export const provideMockConfigService = (override: Partial<Config> = {}) =>
  provideMockService(ConfigService)({
    config: {
      ...defaultMockConfiguration,
      ...override,
    },
  });
