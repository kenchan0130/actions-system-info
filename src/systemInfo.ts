import os from "node:os";
import macosRelease from "macos-release";
import getWinVersion from "win-version";
import windowsRelase from "windows-release";

import { getosAsync } from "./getosAsync";

export type SystemInfo = Readonly<{
  cpu: Readonly<{
    core: number;
    model: string;
  }>;
  hostname: string;
  kernel: Readonly<{
    release: string;
    version: string;
  }>;
  name: string;
  platform: string;
  release: string;
  totalmem: number; // Bytes
}>;

export const getSystemInfo = async (): Promise<SystemInfo> => {
  const cpus = os.cpus();
  const getosResult = await getosAsync();
  const [name, release] = (() => {
    if (getosResult.os === "linux") {
      return [getosResult.dist, getosResult.release];
    }

    if (getosResult.os === "darwin") {
      const macos = macosRelease();
      return [macos.name, macos.version];
    }

    if (getosResult.os === "win32") {
      return [windowsRelase(os.release()) ?? "Unknown", `${getWinVersion().version}`];
    }

    throw new Error(`${getosResult.os} is not supported.`);
  })();

  return Promise.resolve({
    cpu: {
      core: cpus.length,
      model: cpus[0].model,
    },
    hostname: os.hostname(),
    kernel: {
      release: os.release(),
      version: os.version(),
    },
    name,
    platform: os.platform(),
    release,
    totalmem: os.totalmem(),
  });
};
