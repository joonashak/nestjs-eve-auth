import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export const invalidRefreshTokenMessage = "Invalid refresh token.";

/** @group Exceptions */
export class InvalidRefreshTokenException extends EveAuthException {
  constructor() {
    super(invalidRefreshTokenMessage, HttpStatus.UNAUTHORIZED);
  }
}
