import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { Consumer } from "./consumer.service";

@Module({
  providers: [ConfigService, Consumer],
  exports: [ConfigService, Consumer],
})
export class ConfigModule {}
