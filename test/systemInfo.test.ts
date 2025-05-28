import { describe, expect, it } from "vitest";

import { getSystemInfo } from "./../src/systemInfo";
import { nonEmptyStringExpect, platformList } from "./helpers/helper";

describe("getSystemInfo", () => {
  it("should return system info", async () => {
    await expect(getSystemInfo()).resolves.toMatchObject({
      hostname: nonEmptyStringExpect,
      cpu: {
        core: expect.any(Number),
        model: nonEmptyStringExpect,
      },
      kernel: {
        release: nonEmptyStringExpect,
        version: nonEmptyStringExpect,
      },
      platform: expect.stringMatching(
        new RegExp(`^${platformList.map((v) => `(${v})`).join("|")}$`)
      ),
      totalmem: expect.any(Number),
      name: nonEmptyStringExpect,
      release: nonEmptyStringExpect,
      manufacturer: nonEmptyStringExpect,
      model: nonEmptyStringExpect,
      serial: nonEmptyStringExpect,
      sku: nonEmptyStringExpect,
    });
  });
});
