import { createMock } from "@golevelup/ts-jest";
import { Logger } from "../logger/logger.service";

export const provideMockLogger = () => ({
  provide: Logger,
  useFactory: () => createMock<Logger>(),
});
