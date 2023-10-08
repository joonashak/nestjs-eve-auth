import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { EVE_AUTH_SESSION_USER_ESI_ID_TOKEN } from "../constants";

/**
 * Allow only users authenticated by `nestjs-eve-auth`.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // FIXME: This is probably stupid at least semantically. Use properly named field like `isAuthenticated`. Also, fields should be namespaced with lib name to avoid collisions.
    return !!context.switchToHttp().getRequest().session[
      EVE_AUTH_SESSION_USER_ESI_ID_TOKEN
    ];
  }
}
