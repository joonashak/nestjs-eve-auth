import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { SessionUtils } from "../sso/session.utils";

/**
 * Allow only users authenticated by `nestjs-eve-auth`.
 *
 * @group Guards
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { session } = context.switchToHttp().getRequest();
    return !!SessionUtils.getUserEsiId(session);
  }
}
