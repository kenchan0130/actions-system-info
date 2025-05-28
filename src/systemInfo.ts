import os from "node:os";
import macosRelease from "macos-release";
import * as si from "systeminformation";
import getWinVersion from "win-version";
import windowsRelase from "windows-release";

import { getosAsync } from "./getosAsync";

export type SystemInfo = Readonly<{
  baseboard: Readonly<{
    manufacturer: string;
    model: string;
    version: string;
    serial: string;
  }>;
  bios: Readonly<{
    vendor: string;
    version: string;
  }>;
  cpu: Readonly<{
    core: number;
    model: string;
  }>;
  hostname: string;
  kernel: Readonly<{
    release: string;
    version: string;
  }>;
  manufacturer: string;
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
      return [windowsRelase(), `${getWinVersion().version}`];
    }

    throw new Error(`${getosResult.os} is not supported.`);
  })();

  const system = await si.system();
  const bios = await si.bios();
  const baseboard = await si.baseboard();

  return Promise.resolve({
    baseboard: {
      manufacturer: baseboard.manufacturer,
      model: baseboard.model,
      version: baseboard.version,
      serial: baseboard.serial,
    },
    bios: {
      vendor: bios.vendor,
      version: bios.version,
    },
    cpu: {
      core: cpus.length,
      model: cpus[0].model,
    },
    hostname: os.hostname(),
    kernel: {
      release: os.release(),
      version: os.version(),
    },
    manufacturer: system.manufacturer,
    name,
    platform: os.platform(),
    release,
    totalmem: os.totalmem(),
  });
};
