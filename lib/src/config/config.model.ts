import { IsNotEmpty, IsUrl } from "class-validator";

export class Config {
  constructor(init?: Partial<Config>) {
    Object.assign(this, init);
  }

  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  secretKey: string;

  @IsUrl({ require_tld: false })
  callbackUrl: string;

  @IsUrl()
  authorizationUrl = "https://login.eveonline.com/v2/oauth/authorize";

  @IsUrl()
  tokenUrl = "https://login.eveonline.com/v2/oauth/token";
}
