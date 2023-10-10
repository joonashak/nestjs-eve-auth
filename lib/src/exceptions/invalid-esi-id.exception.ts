import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export const invalidEsiIdMessage = "Invalid ESI ID.";

export class InvalidEsiIdException extends EveAuthException {
  constructor() {
    super(invalidEsiIdMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
