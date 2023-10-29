import { Test } from "@nestjs/testing";
import axios from "axios";
import {
  InvalidAccessTokenException,
  InvalidRefreshTokenException,
} from "../exceptions";
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

  it("Revokes refresh tokens correctly", async () => {
    const refreshToken = "n0vw8rf6";
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: accessToken, refresh_token: refreshToken },
    });

    const test = async () => eveSsoService.revokeRefreshToken(refreshToken);
    await expect(test()).resolves.toBeUndefined();

    expect(axios.post).toBeCalledWith(
      defaultMockConfiguration.revocationUrl,
      expect.objectContaining({
        _streams: expect.arrayContaining(["refresh_token", refreshToken]),
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

  describe("Verify SSO token", () => {
    it("Verifies SSO token and returns decoded data", async () => {
      const accessToken = "jd0283hb2";
      const data = "asd";
      mockedAxios.get.mockResolvedValueOnce({ data });

      const test = async () =>
        eveSsoService.verifyAndDecodeSsoAccessToken(accessToken);
      await expect(test()).resolves.toEqual(data);

      expect(axios.get).toBeCalledWith(
        defaultMockConfiguration.verifyUrl,
        expect.objectContaining({
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
    });

    it("Throws for failed token verification", async () => {
      mockedAxios.get.mockRejectedValueOnce({});
      const test = async () => eveSsoService.verifyAndDecodeSsoAccessToken("");
      await expect(test()).rejects.toThrow(InvalidAccessTokenException);
    });
  });
});
