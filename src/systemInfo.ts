import os from "node:os";
import macosRelease from "macos-release";
import * as si from "systeminformation";
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
  manufacturer: string;
  model: string;
  serial: string;
};

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
      return [windowsRelase(), `${getWinVersion().version}`];
    }

    throw new Error(`${getosResult.os} is not supported.`);
  })();

  const system = await si.system();

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
    manufacturer: system.manufacturer,
    model: system.model,
    serial: system.serial,
  });
};
