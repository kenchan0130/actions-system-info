import * as core from "@actions/core";

import { getSystemInfo } from "./systemInfo";

export async function main(): Promise<void> {
  core.debug(`Process versions: ${JSON.stringify(process.versions, null, 2)}`);

  const systemInfo = await getSystemInfo();

  core.debug(`System Info: ${JSON.stringify(systemInfo, null, 2)}`);

  core.setOutput("cpu-core", systemInfo.cpu.core);
  core.setOutput("cpu-model", systemInfo.cpu.model.trim());
  core.setOutput("hostname", systemInfo.hostname.trim());
  core.setOutput("platform", systemInfo.platform.trim());
  core.setOutput("kernel-release", systemInfo.kernel.release.trim());
  core.setOutput("kernel-version", systemInfo.kernel.version.trim());
  core.setOutput("manufacturer", systemInfo.manufacturer.trim());
  core.setOutput("model", systemInfo.model.trim());
  core.setOutput("name", systemInfo.name.trim());
  core.setOutput("release", systemInfo.release.trim());
  core.setOutput("serial", systemInfo.serial.trim());
  core.setOutput("totalmem", systemInfo.totalmem);
}

main().catch((e: Error) => core.setFailed(e.message));
