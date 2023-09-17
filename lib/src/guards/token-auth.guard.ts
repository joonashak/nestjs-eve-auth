import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { EVE_AUTH_SESSION_ESI_ID_KEY } from "../constants";

@Injectable()
export class TokeAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return !!context.switchToHttp().getRequest().session[
      EVE_AUTH_SESSION_ESI_ID_KEY
    ];
  }
}
