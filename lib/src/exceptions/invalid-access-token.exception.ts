import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export const invalidAccessTokenMessage = "Invalid access token.";

export class InvalidAccessTokenException extends EveAuthException {
  constructor() {
    super(invalidAccessTokenMessage, HttpStatus.UNAUTHORIZED);
  }
}
