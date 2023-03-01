import * as core from "@actions/core";

import { getSystemInfo } from "./systemInfo";

export async function main(): Promise<void> {
  core.debug(`Process versions: ${JSON.stringify(process.versions, null, 2)}`);

  const systemInfo = await getSystemInfo();

  core.debug(`System Info: ${JSON.stringify(systemInfo, null, 2)}`);

  core.setOutput("cpu-core", systemInfo.cpu.core);
  core.setOutput("cpu-model", systemInfo.cpu.model);
  core.setOutput("hostname", systemInfo.hostname);
  core.setOutput("platform", systemInfo.platform);
  core.setOutput("kernel-release", systemInfo.kernel.release);
  core.setOutput("kernel-version", systemInfo.kernel.version);
  core.setOutput("name", systemInfo.name);
  core.setOutput("release", systemInfo.release);
  core.setOutput("totalmem", systemInfo.totalmem);
}

main().catch((e: Error) => core.setFailed(e.message));
