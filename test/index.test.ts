import * as core from "@actions/core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { main } from "../src";
import { nonEmptyStringExpect } from "./helpers/helper";

vi.mock("@actions/core", () => {
  return {
    setOutput: vi.fn(),
    debug: (_: string) => {
      return;
    },
    setFailed: (_: string) => {
      return;
    },
  };
});

describe("main", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set correct outputs", async () => {
    await main();

    expect(core.setOutput).toBeCalledWith("cpu-core", expect.any(Number));
    expect(core.setOutput).toBeCalledWith("cpu-model", nonEmptyStringExpect);
    expect(core.setOutput).toBeCalledWith("hostname", nonEmptyStringExpect);
    expect(core.setOutput).toBeCalledWith(
      "kernel-release",
      nonEmptyStringExpect
    );
    expect(core.setOutput).toBeCalledWith(
      "kernel-version",
      nonEmptyStringExpect
    );
    expect(core.setOutput).toBeCalledWith("name", nonEmptyStringExpect);
    expect(core.setOutput).toBeCalledWith("release", nonEmptyStringExpect);
    expect(core.setOutput).toBeCalledWith("totalmem", expect.any(Number));
  });
});
