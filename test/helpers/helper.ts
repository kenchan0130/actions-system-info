import { expect } from "vitest";

export const nonEmptyStringExpect = expect.stringMatching(
  new RegExp(".+", "ms")
);

export const platformList: NodeJS.Platform[] = [
  "aix",
  "android",
  "darwin",
  "freebsd",
  "linux",
  "openbsd",
  "sunos",
  "win32",
  "cygwin",
  "netbsd",
];
