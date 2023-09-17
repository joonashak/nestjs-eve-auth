import { UseGuards, applyDecorators } from "@nestjs/common";
import { TokeAuthGuard } from "../guards/token-auth.guard";

export const RequireAuth = () => applyDecorators(UseGuards(TokeAuthGuard));
