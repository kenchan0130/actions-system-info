const mockSetOutput = jest.fn();

import { main } from "../src";
import { nonEmptyStringExpect } from "./helpers/helper";

jest.mock("@actions/core", () => {
  return {
    setOutput: mockSetOutput,
    debug: (message: string) => {
      console.log(message);
    },
    setFailed: (message: string) => {
      console.error(message);
    },
  };
});

describe("main", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set correct outputs", async () => {
    await main();

    expect(mockSetOutput).toBeCalledWith("cpu-core", expect.any(Number));
    expect(mockSetOutput).toBeCalledWith("cpu-model", nonEmptyStringExpect);
    expect(mockSetOutput).toBeCalledWith("hostname", nonEmptyStringExpect);
    expect(mockSetOutput).toBeCalledWith(
      "kernel-release",
      nonEmptyStringExpect
    );
    expect(mockSetOutput).toBeCalledWith("name", nonEmptyStringExpect);
    expect(mockSetOutput).toBeCalledWith("release", nonEmptyStringExpect);
    expect(mockSetOutput).toBeCalledWith("totalmem", expect.any(Number));
  });
});
