import { EVE_AUTH_SESSION_USER_ESI_ID_TOKEN } from "../constants";
import { mockContextWithSession } from "../test-utils/mock-context";
import { TokenAuthGuard } from "./token-auth.guard";

describe("TokenAuthGuard", () => {
  let guard: TokenAuthGuard;

  beforeEach(() => {
    guard = new TokenAuthGuard();
  });

  it("Allows access with existing user ID in session data", () => {
    const ctx = mockContextWithSession({
      [EVE_AUTH_SESSION_USER_ESI_ID_TOKEN]: "asd",
    });
    expect(guard.canActivate(ctx)).toBeTruthy();
  });

  it("Denies access with missing user ID in session data", () => {
    const ctx = mockContextWithSession({});
    expect(guard.canActivate(ctx)).toBeFalsy();
  });

  it("Denies access with empty user ID in session data", () => {
    const ctx = mockContextWithSession({
      [EVE_AUTH_SESSION_USER_ESI_ID_TOKEN]: "",
    });
    expect(guard.canActivate(ctx)).toBeFalsy();
  });

  it("Denies access with undefined user ID in session data", () => {
    const ctx = mockContextWithSession({
      [EVE_AUTH_SESSION_USER_ESI_ID_TOKEN]: undefined,
    });
    expect(guard.canActivate(ctx)).toBeFalsy();
  });
});
