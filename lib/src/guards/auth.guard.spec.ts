import { mockContextWithSession, mockContextWithUserEsiId } from "../test-utils/mock-context";
import { AuthGuard } from "./auth.guard";

describe("TokenAuthGuard", () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  it("Allows access with existing user ID in session data", () => {
    const ctx = mockContextWithUserEsiId("asd");
    expect(guard.canActivate(ctx)).toBeTruthy();
  });

  it("Denies access with missing user ID in session data", () => {
    const ctx = mockContextWithSession({});
    expect(guard.canActivate(ctx)).toBeFalsy();
  });

  it("Denies access with empty user ID in session data", () => {
    const ctx = mockContextWithUserEsiId("");
    expect(guard.canActivate(ctx)).toBeFalsy();
  });

  it("Denies access with undefined user ID in session data", () => {
    const ctx = mockContextWithUserEsiId(undefined);
    expect(guard.canActivate(ctx)).toBeFalsy();
  });
});
