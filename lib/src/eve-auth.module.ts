import { Module } from "@nestjs/common";
import { ConfigurableEveAuthModule } from "./eve-auth.module-definition";

@Module({})
export class EveAuthModule extends ConfigurableEveAuthModule {}
