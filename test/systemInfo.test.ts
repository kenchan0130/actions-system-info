import { Arch, getSystemInfo } from "./../src/systemInfo";
import { nonEmptyStringExpect, platformList } from "./helper/helper";

describe("getSystemInfo", () => {
  it("should return system info", async () => {
    await expect(getSystemInfo()).resolves.toMatchObject({
      arch: expect.stringMatching(
        new RegExp(
          `^${Object.values(Arch)
            .map((v) => `(${v})`)
            .join("|")}$`
        )
      ),
      hostname: nonEmptyStringExpect,
      cpu: {
        core: expect.any(Number),
        model: nonEmptyStringExpect,
      },
      kernel: {
        release: nonEmptyStringExpect,
      },
      platform: expect.stringMatching(
        new RegExp(`^${platformList.map((v) => `(${v})`).join("|")}$`)
      ),
      totalmem: expect.any(Number),
      name: nonEmptyStringExpect,
      release: nonEmptyStringExpect,
    });
  });
});
