/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleMetadata } from "@nestjs/common";
import { EveAuthModuleOptions } from "./eve-auth-module-options.interface";

export interface EveAuthModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory(...args: any[]): Promise<EveAuthModuleOptions>;
  inject?: any[];
}
