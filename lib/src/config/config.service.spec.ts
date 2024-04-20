import { InvalidConfigurationException } from "../exceptions/invalid-configuration.exception";
import { mockModuleOptions } from "../utils/mock-module-options";
import { ConfigService } from "./config.service";

describe("ConfigService", () => {
  it("Accepts valid options", () => {
    const configService = new ConfigService(mockModuleOptions);
    expect(configService.config).toMatchObject(mockModuleOptions);
  });

  it("Validates options", () => {
    expect(
      () => new ConfigService({ ...mockModuleOptions, tokenUrl: "not a URL" }),
    ).toThrow(InvalidConfigurationException);
  });
});
