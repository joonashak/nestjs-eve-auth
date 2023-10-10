import { createMock } from "@golevelup/ts-jest";
import { Logger } from "../logger/logger.service";
import { EveSsoService } from "../sso/eve-sso.service";
import { SessionService } from "../sso/session.service";

export const provideMockService =
  <T extends object>(token: T) =>
  () => ({
    provide: token,
    useFactory: () => createMock<T>(),
  });

export const provideMockLogger = provideMockService(Logger);

// export const provideMockLogger2 = () => ({
//   provide: Logger,
//   useFactory: () => createMock<Logger>(),
// });

export const provideMockSessionService = provideMockService(SessionService);

export const provideMockEveSsoService = provideMockService(EveSsoService);
