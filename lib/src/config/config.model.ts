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

  // FIXME: Implement these. See https://github.com/nestjs/nest/issues/1438#issuecomment-872012841
  // @IsNotEmpty()
  // loginPath = "/sso/login";

  // @IsNotEmpty()
  // callbackPath = "/sso/callback";
}
