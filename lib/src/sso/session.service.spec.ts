import { Test } from "@nestjs/testing";
import {
  EVE_AUTH_SESSION_KEY,
  EVE_AUTH_SESSION_USER_ESI_ID_KEY,
} from "../constants";
import { SessionStateNotFound } from "../exceptions";
import { provideMockLogger } from "../test-utils/mock-logger";
import { mockSessionState } from "../test-utils/mock-session";
import { SessionService } from "./session.service";

describe("SessionService", () => {
  let sessionService: SessionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SessionService, provideMockLogger()],
    }).compile();

    sessionService = module.get(SessionService);
  });

  it("Returns correct state", () => {
    const state = "09efj0w84hf";
    expect(sessionService.getStateOrFail(mockSessionState(state))).toEqual(
      state,
    );
  });

  it("Throws for undefined session", () => {
    const test = () => sessionService.getStateOrFail({});
    expect(test).toThrow(SessionStateNotFound);
  });

  it("Throws for undefined state", () => {
    const test = () =>
      sessionService.getStateOrFail(mockSessionState(undefined));
    expect(test).toThrow(SessionStateNotFound);
  });

  it("Throws for empty state", () => {
    const test = () => sessionService.getStateOrFail(mockSessionState(""));
    expect(test).toThrow(SessionStateNotFound);
  });

  it("Saves ESI ID", () => {
    const session = {};
    const id = 1234;
    sessionService.setUserEsiId(session, id);

    expect(session).toMatchObject({
      [EVE_AUTH_SESSION_KEY]: { [EVE_AUTH_SESSION_USER_ESI_ID_KEY]: id },
    });
  });
});
