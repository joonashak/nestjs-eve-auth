import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";

export const mockContextWithRequest = (req: object): ExecutionContext => {
  const context = createMock<ExecutionContext>({
    switchToHttp: () => ({ getRequest: () => req }),
  });
  return context;
};

export const mockContextWithSession = (session: object): ExecutionContext =>
  mockContextWithRequest({ session });
