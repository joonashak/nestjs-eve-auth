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
      useFactory: async (consumerService: UserService) => ({
        clientId: process.env.CLIENT_ID,
        secretKey: process.env.SECRET_KEY,
        callbackUrl: "http://localhost:3000/sso/callback",
        afterLoginUrl: "http://localhost:3000",
        service: consumerService,
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
