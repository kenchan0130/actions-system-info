# GitHub Actions runner OS system information

[![Release](https://img.shields.io/github/v/release/kenchan0130/actions-system-info)](https://github.com/kenchan0130/actions-system-info/releases)
[![Nigthly](https://github.com/kenchan0130/actions-system-info/workflows/Nigthly/badge.svg)](https://github.com/kenchan0130/actions-system-info/actions?query=workflow%3ANigthly)

This action provides GitHub Actions runner OS information.

## Outputs

Name|Description
---|---
`cpu-core`|Logical CPU core size
`cpu-model`|Logical CPU model name
`hostname`|The host name of the operating system
`kernel-release`|The kernel release
`kernel-version`|The kernel version
`name`|The operating system (distribution) name
`platform`|The operating system identity
`release`|The operating system (distribution) release
`totalmem`|the total amount of system memory in bytes

If you want to see the specific output contents for each OS, you can check them at [here](https://github.com/kenchan0130/actions-system-info/actions/workflows/nigthly.yml).

## Example usage

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: kenchan0130/actions-system-info@master
    id: system-info
  - uses: actions/cache@v4
    with:
      path: ~/.npm
      key: ${{ runner.os }}-${{ steps.system-info.outputs.release }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: ${{ runner.os }}-${{ steps.system-info.outputs.release }}-node-
```

The cache may be affected by internal changes in the OS version of the runner.
In this example, adding the OS version of the runner to the key may solve this problem.
