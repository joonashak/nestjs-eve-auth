import { Module } from "@nestjs/common";
import { EveAuthModule } from "nestjs-eve-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [AuthModule, EveAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
