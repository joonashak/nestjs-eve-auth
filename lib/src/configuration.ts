const configuration = {
  sso: {
    authorizationUrl: "https://login.eveonline.com/v2/oauth/authorize",
    tokenUrl: "https://login.eveonline.com/v2/oauth/token",
    loginPath: "/sso/login",
    callbackPath: "/sso/callback",
  },
};

export default configuration;
