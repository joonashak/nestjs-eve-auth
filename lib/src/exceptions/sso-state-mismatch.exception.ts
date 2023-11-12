import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export const ssoStateMismatchMessage =
  "SSO login states do not match. This could be due to server misconfiguration but might also indicate suspicious activity. Treat with high severity.";

/** @group Exceptions */
export class SsoStateMismatchException extends EveAuthException {
  constructor() {
    super(ssoStateMismatchMessage, HttpStatus.UNAUTHORIZED);
  }
}
