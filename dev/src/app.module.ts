import { Module } from "@nestjs/common";
import { EveAuthModule } from "nestjs-eve-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    // EveAuthModule.forRoot({
    //   clientId: process.env.CLIENT_ID,
    //   secretKey: process.env.SECRET_KEY,
    //   callbackUrl: "http://localhost:3000/sso/callback",
    //   global: true,
    // }),
    EveAuthModule.forRootAsync({
      clientId: process.env.CLIENT_ID,
      secretKey: process.env.SECRET_KEY,
      callbackUrl: "http://localhost:3000/sso/callback",
      global: true,
      useFactory: async (userService: UserService) => ({
        clientId: "asd",
        secretKey: "",
        callbackUrl: "",
        global: false,
        authorizationUrl: "asd",
        tokenUrl: "asd",
        asd: userService.create(),
      }),
      inject: [UserService],
      imports: [UserModule],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
