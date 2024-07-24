import { IsArray, IsNotEmpty, IsUrl } from "class-validator";

// Slightly looser URL validation to allow for local addresses.
const urlOptions = {
  require_tld: false,
  require_protocol: true,
  protocols: ["http", "https"],
};

export class Config {
  constructor(init?: Partial<Config>) {
    Object.assign(this, init);
  }

  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  secretKey: string;

  @IsUrl(urlOptions)
  callbackUrl: string;

  @IsArray()
  scopes: string[] = [];

  @IsUrl(urlOptions)
  authorizationUrl = "https://login.eveonline.com/v2/oauth/authorize";

  @IsUrl(urlOptions)
  tokenUrl = "https://login.eveonline.com/v2/oauth/token";

  @IsUrl(urlOptions)
  verifyUrl = "https://login.eveonline.com/oauth/verify";

  @IsUrl(urlOptions)
  revocationUrl = "https://login.eveonline.com/v2/oauth/revoke";
}
