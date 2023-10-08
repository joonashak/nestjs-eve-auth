import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { SessionUtils } from "../sso";

/**
 * Allow only users authenticated by `nestjs-eve-auth`.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { session } = context.switchToHttp().getRequest();
    return !!SessionUtils.getUserEsiId(session);
  }
}
