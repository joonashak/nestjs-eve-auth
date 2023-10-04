import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EveAuthModule } from "nestjs-eve-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    EveAuthModule.forRootAsync({
      useFactory: async () => ({
        clientId: process.env.CLIENT_ID,
        secretKey: process.env.SECRET_KEY,
        callbackUrl: "http://localhost:3000/sso/callback",
        afterLoginUrl: "http://localhost:3000",
      }),
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
