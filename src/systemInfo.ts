import macosRelease from "macos-release";
import os from "os";
import getWinVersion from "win-version";
import windowsRelase from "windows-release";

import { getosAsync } from "./getosAsync";

export const Arch = {
  arm: "arm",
  arm64: "arm64",
  ia32: "ia32",
  mips: "mips",
  mipsel: "mipsel",
  ppc: "ppc",
  ppc64: "ppc64",
  s390: "s390",
  s390x: "s390x",
  x32: "x32",
  x64: "x64",
} as const;
type Arch = typeof Arch[keyof typeof Arch];

export type SystemInfo = {
  arch: typeof Arch[keyof typeof Arch];
  hostname: string;
  cpu: {
    core: number;
    model: string;
  };
  totalmem: number; // Bytes
  kernel: {
    release: string;
    // os.version() is not supported node12 of GitHub Actions yet
    // version: string;
  };
  name: string;
  platform: string;
  release: string;
};

export const getSystemInfo = async (): Promise<SystemInfo> => {
  const cpus = os.cpus();
  const getosResult = await getosAsync();
  const [name, release] = (() => {
    if (getosResult.os === "linux") {
      return [getosResult.dist, getosResult.release];
    } else if (getosResult.os === "darwin") {
      const macos = macosRelease();
      return [macos.name, macos.version];
    } else if (getosResult.os === "win32") {
      return [windowsRelase(), `${getWinVersion().version}`];
    } else {
      throw new Error(`${getosResult.os} is not supported.`);
    }
  })();

  return Promise.resolve({
    arch: os.arch() as Arch,
    hostname: os.hostname(),
    cpu: {
      core: cpus.length,
      model: cpus[0].model,
    },
    kernel: {
      release: os.release(),
    },
    totalmem: os.totalmem(),
    platform: os.platform(),
    name,
    release,
  });
};
