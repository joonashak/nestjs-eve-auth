import { Test } from "@nestjs/testing";
import { SsoStateMismatchException } from "../exceptions";
import {
  provideMockEveSsoService,
  provideMockLogger,
  provideMockSessionService,
} from "../test-utils/mock-services";
import { EveSsoService } from "./eve-sso.service";
import { SessionService } from "./session.service";
import { SsoService } from "./sso.service";

const state = "09jf384";
const tokens = {
  accessToken: "0f893h45g08h",
  refreshToken: "0f9j403n85",
};
const character = {
  id: 986234,
  name: "Test Character",
};

describe("SsoService", () => {
  let ssoService: SsoService;
  let sessionService: SessionService;
  let eveSsoService: EveSsoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SsoService,
        provideMockLogger(),
        provideMockSessionService({
          getStateOrFail: jest.fn().mockReturnValue(state),
        }),
        provideMockEveSsoService({
          getTokens: jest.fn().mockResolvedValue(tokens),
          verifyAndDecodeSsoAccessToken: jest.fn().mockResolvedValue({
            CharacterID: character.id,
            CharacterName: character.name,
          }),
        }),
      ],
    }).compile();

    ssoService = module.get(SsoService);
    sessionService = module.get(SessionService);
    eveSsoService = module.get(EveSsoService);
  });

  describe("Callback from EVE SSO server", () => {
    it("Handles good callback correctly", async () => {
      const code = "fj4038q";

      const test = async () => ssoService.callback({ code, state }, {});

      await expect(test()).resolves.toMatchObject({ tokens, character });
      expect(sessionService.getStateOrFail).toBeCalledTimes(1);
      expect(eveSsoService.getTokens).toBeCalledTimes(1);
      expect(eveSsoService.verifyAndDecodeSsoAccessToken).toBeCalledTimes(1);
      expect(sessionService.setUserEsiId).toBeCalledTimes(1);
      expect(sessionService.setUserEsiId).toBeCalledWith({}, character.id);
    });

    it("Throws for missing state", async () => {
      const test = async () =>
        ssoService.callback({ code: "asd", state: "" }, {});
      await expect(test()).rejects.toThrow(SsoStateMismatchException);
    });

    it("Throws for wrong state", async () => {
      const test = async () =>
        ssoService.callback({ code: "asd", state: state + "a" }, {});
      await expect(test()).rejects.toThrow(SsoStateMismatchException);
    });
  });

  describe("Logout", () => {
    it("Revokes SSO refresh token", async () => {
      const refreshToken = "jd98qh39";
      await ssoService.revokeRefreshToken(refreshToken);
      expect(eveSsoService.revokeRefreshToken).toBeCalledTimes(1);
      expect(eveSsoService.revokeRefreshToken).toBeCalledWith(refreshToken);
    });
  });

  describe("Token refreshing", () => {
    it("Refreshes tokens via EveSsoService", async () => {
      const refreshToken = "09n3n2f8d0h";
      await ssoService.refreshTokens(refreshToken);
      expect(eveSsoService.refreshTokens).toBeCalledWith(refreshToken);
    });
  });
});
