import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

/** @group Exceptions */
export class UnknownException extends EveAuthException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(error?: any) {
    super(error || "Unknown exception.", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
