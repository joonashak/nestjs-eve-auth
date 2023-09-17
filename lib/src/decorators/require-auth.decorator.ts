import { UseGuards, applyDecorators } from "@nestjs/common";
import { TokenAuthGuard } from "../guards/token-auth.guard";

export const RequireAuth = () => applyDecorators(UseGuards(TokenAuthGuard));
