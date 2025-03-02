import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { EVE_AUTH_SESSION_KEY, EVE_AUTH_SESSION_USER_ESI_ID_KEY } from "../constants";

export const mockContextWithRequest = (req: object): ExecutionContext => {
  const context = createMock<ExecutionContext>({
    switchToHttp: () => ({ getRequest: () => req }),
  });
  return context;
};

export const mockContextWithSession = (session: object): ExecutionContext =>
  mockContextWithRequest({ session });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockContextWithUserEsiId = (userEsiId: any): ExecutionContext =>
  mockContextWithSession({
    [EVE_AUTH_SESSION_KEY]: { [EVE_AUTH_SESSION_USER_ESI_ID_KEY]: userEsiId },
  });
