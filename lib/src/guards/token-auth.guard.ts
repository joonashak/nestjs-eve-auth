import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { EVE_AUTH_SESSION_USER_ESI_ID_TOKEN } from "../constants";

@Injectable()
export class TokenAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return !!context.switchToHttp().getRequest().session[
      EVE_AUTH_SESSION_USER_ESI_ID_TOKEN
    ];
  }
}
