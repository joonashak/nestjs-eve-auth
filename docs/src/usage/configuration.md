# Configuration

`EveAuthModule` exposes static methods `forRoot` and `forRootAsync` for passing configuration
synchronously or asynchronously, respectively. It is exported as a global module, however, I still
recommend importing at the top-level module of your application.

## Register EVE SSO Application

Before you can use EVE SSO you must register your application at
[EVE Developer Portal](https://developers.eveonline.com/applications). Make sure to use the same
`callbackUrl` value in your configuration and application registration (can be changed later).

::: danger Remember to take care not to commit your EVE SSO secrets to version control! :::

## Library Configuration

Minimal example of synchronous configuration:

```ts
import { Module } from "@nestjs/common";
import { EveAuthModule } from "@joonashak/nestjs-eve-auth";

@Module({
  imports: [
    EveAuthModule.forRoot({
      clientId: process.env.CLIENT_ID,
      secretKey: process.env.SECRET_KEY,
      callbackUrl: "http://localhost:3000/sso/callback",
    }),
  ],
})
export class AppModule {}
```

See [EveAuthModuleOptions documentation](../api/interfaces/EveAuthModuleOptions) for all
configurable options and usage descriptions.

## Session Middleware

`express-session` middleware must be used for `nestjs-eve-auth` to function. See
[Nest.js docs](https://docs.nestjs.com/techniques/session) for setup instructions.

Other session middleware might work but this is not supported. I recommend sticking with
`express-session`.
