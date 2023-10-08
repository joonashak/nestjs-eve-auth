import { HttpStatus } from "@nestjs/common";
import { EveAuthException } from "./eve-auth.exception";

export class InvalidConfigurationException extends EveAuthException {
  constructor() {
    super(
      "nestjs-eve-auth is not correctly configured.",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
