import { getosAsync } from "../src/getosAsync";

describe("getosAsync", () => {
  it("should return OS info", async () => {
    await expect(getosAsync()).resolves.toMatchObject({
      os: expect.any(String),
    });
  });
});
