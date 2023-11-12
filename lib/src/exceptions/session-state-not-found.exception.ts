import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export const sessionStateNotFoundMessage = "Session state not found.";

/** @group Exceptions */
export class SessionStateNotFound extends EveAuthException {
  constructor() {
    super(sessionStateNotFoundMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
