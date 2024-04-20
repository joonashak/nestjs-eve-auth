/** @group Types */
export interface EveAuthModuleOptions {
  /** Your app's EVE SSO Client ID. */
  clientId: string;
  /** Your app's EVE SSO Secret Key. */
  secretKey: string;
  /**
   * Your app's EVE SSO Callback URL.
   *
   * This MUST match what you have entered in your app's EVE SSO configuration
   * or the authentication will fail. The correct value should be your server
   * address appended with `/sso/callback`. E.g., when developing locally, this
   * could be `http://localhost:3000/sso/callback`.
   */
  callbackUrl: string;
  /** Permission scopes to request in SSO. */
  scopes?: string[];
  /**
   * EVE SSO Authorization URL.
   *
   * It is not necessary to set this in normal use. This option is provided for
   * redundancy.
   */
  authorizationUrl?: string;
  /**
   * EVE SSO Token URL.
   *
   * It is not necessary to set this in normal use. This option is provided for
   * redundancy.
   */
  tokenUrl?: string;
  /**
   * EVE SSO Token Verification URL.
   *
   * It is not necessary to set this in normal use. This option is provided for
   * redundancy.
   */
  verifyUrl?: string;
  /**
   * EVE SSO Token Verification URL.
   *
   * It is not necessary to set this in normal use. This option is provided for
   * redundancy.
   */
  revocationUrl?: string;
}
