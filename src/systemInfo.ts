import macosRelease from "macos-release";
import os from "os";
import getWinVersion from "win-version";
import windowsRelase from "windows-release";

import { getosAsync } from "./getosAsync";

export type SystemInfo = {
  hostname: string;
  cpu: {
    core: number;
    model: string;
  };
  totalmem: number; // Bytes
  kernel: {
    release: string;
    version: string;
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
    hostname: os.hostname(),
    cpu: {
      core: cpus.length,
      model: cpus[0].model,
    },
    kernel: {
      release: os.release(),
      version: os.version(),
    },
    totalmem: os.totalmem(),
    platform: os.platform(),
    name,
    release,
  });
};
