import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import {
  EVE_AUTH_SESSION_KEY,
  EVE_AUTH_SESSION_USER_ESI_ID_KEY,
} from "../constants";

/**
 * Allow only users authenticated by `nestjs-eve-auth`.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return !!context.switchToHttp().getRequest().session[
      EVE_AUTH_SESSION_KEY
    ]?.[EVE_AUTH_SESSION_USER_ESI_ID_KEY];
  }
}
