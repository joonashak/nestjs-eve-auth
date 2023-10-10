import { createMock } from "@golevelup/ts-jest";
import { Logger } from "../logger/logger.service";
import { EveSsoService } from "../sso/eve-sso.service";
import { SessionService } from "../sso/session.service";

export const provideMockService =
  <T extends abstract new (...args: any) => any>(token: T) =>
  (partial?: Partial<InstanceType<T>>) => ({
    provide: token,
    useFactory: () => createMock<InstanceType<T>>(partial || {}),
  });

export const provideMockLogger = provideMockService(Logger);

export const provideMockSessionService = provideMockService(SessionService);

export const provideMockEveSsoService = provideMockService(EveSsoService);
