import * as core from "@actions/core";

import { getSystemInfo } from "./systemInfo";

export async function main(): Promise<void> {
  core.debug(`Process versions: ${JSON.stringify(process.versions, null, 2)}`);

  const systemInfo = await getSystemInfo();

  core.debug(`System Info: ${JSON.stringify(systemInfo, null, 2)}`);

  const outputs = {
    "baseboard-manufacturer": systemInfo.baseboard.manufacturer,
    "baseboard-model": systemInfo.baseboard.model,
    "baseboard-version": systemInfo.baseboard.version,
    "baseboard-serial": systemInfo.baseboard.serial,
    "bios-version": systemInfo.bios.version,
    "bios-vendor": systemInfo.bios.vendor,
    "cpu-core": systemInfo.cpu.core,
    "cpu-model": systemInfo.cpu.model,
    "hostname": systemInfo.hostname,
    "platform": systemInfo.platform,
    "kernel-release": systemInfo.kernel.release,
    "kernel-version": systemInfo.kernel.version,
    "manufacturer": systemInfo.manufacturer,
    "name": systemInfo.name,
    "release": systemInfo.release,
    "totalmem": systemInfo.totalmem,
  };
  Object.entries(outputs).forEach(([key, value]) => {
    core.setOutput(key, typeof value === "string" ? value.trim() : value);
  });
}

main().catch((e: Error) => core.setFailed(e.message));
