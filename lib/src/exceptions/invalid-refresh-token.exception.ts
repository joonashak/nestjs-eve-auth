import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export const invalidRefreshTokenMessage = "Invalid refresh token.";

export class InvalidRefreshTokenException extends EveAuthException {
  constructor() {
    super(invalidRefreshTokenMessage, HttpStatus.UNAUTHORIZED);
  }
}
