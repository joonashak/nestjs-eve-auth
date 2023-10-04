import { EveAuthModuleOptions } from "../eve-auth-module-options.interface";

export const mockModuleOptions: EveAuthModuleOptions = {
  afterLoginUrl: "https://example.com/after-login",
  callbackUrl: "https://example.com/callback",
  clientId: "mock-client-id",
  secretKey: "mock-secret-key",
};
