import { Test } from "@nestjs/testing";
import axios from "axios";
import { InvalidRefreshTokenException } from "../exceptions";
import {
  defaultMockConfiguration,
  provideMockConfigService,
} from "../test-utils/mock-config";
import { provideMockLogger } from "../test-utils/mock-services";
import { EveSsoService } from "./eve-sso.service";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

const accessToken = "0dj83hb2u4";
const refreshToken = "nnfwhf94782g3bf";

describe("EveSsoService", () => {
  let eveSsoService: EveSsoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EveSsoService,
        provideMockLogger(),
        provideMockConfigService(),
      ],
    }).compile();

    eveSsoService = module.get(EveSsoService);
  });

  it("Gets new tokens with authorization code", async () => {
    const authCode = "jd083";
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: accessToken, refresh_token: refreshToken },
    });

    const test = async () => eveSsoService.getTokens(authCode);
    await expect(test()).resolves.toMatchObject({ accessToken, refreshToken });

    expect(axios.post).toBeCalledWith(
      defaultMockConfiguration.tokenUrl,
      expect.objectContaining({
        _streams: expect.arrayContaining(["authorization_code", authCode]),
      }),
      expect.anything(),
    );
  });

  describe("Refresh tokens", () => {
    it("Refreshes tokens correctly", async () => {
      const oldRefreshToken = "dj0q93h2+0f";
      mockedAxios.post.mockResolvedValueOnce({
        data: { access_token: accessToken, refresh_token: refreshToken },
      });

      const test = async () => eveSsoService.refreshTokens(oldRefreshToken);
      await expect(test()).resolves.toMatchObject({
        accessToken,
        refreshToken,
      });

      expect(axios.post).toBeCalledWith(
        defaultMockConfiguration.tokenUrl,
        expect.objectContaining({
          _streams: expect.arrayContaining(["refresh_token", oldRefreshToken]),
        }),
        expect.anything(),
      );
    });

    it("Throws for rejected token refresh", async () => {
      mockedAxios.post.mockRejectedValueOnce({ response: { status: 400 } });
      const test = async () => eveSsoService.refreshTokens("");
      await expect(test()).rejects.toThrow(InvalidRefreshTokenException);
    });
  });
});
