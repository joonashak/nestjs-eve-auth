import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export class InvalidRefreshTokenException extends EveAuthException {
  constructor() {
    super("Invalid refresh token.", HttpStatus.UNAUTHORIZED);
  }
}
