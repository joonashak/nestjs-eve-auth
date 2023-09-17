import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { Consumer } from "./consumer.service";

@Global()
@Module({
  providers: [ConfigService, Consumer],
  exports: [ConfigService, Consumer],
})
export class ConfigModule {}
