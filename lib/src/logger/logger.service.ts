/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleLogger, Inject, Injectable, Scope } from "@nestjs/common";
import { INQUIRER } from "@nestjs/core";

/**
 * Injectable logger, mostly to be able to mock (silence) logging in tests.
 *
 * This could also be used to allow consumers to inject their own logger.
 */
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  constructor(@Inject(INQUIRER) parentClass: object) {
    super(parentClass?.constructor?.name);
  }

  debug(message: unknown): void {
    super.debug(message);
  }

  verbose(message: unknown): void {
    super.verbose(message);
  }

  log(message: unknown): void {
    super.log(message);
  }

  warn(message: unknown): void {
    super.warn(message);
  }

  error(message: unknown): void {
    super.error(message);
  }
}
