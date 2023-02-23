# System Info GitHub Action

This action provides GitHub Actions runner OS information

This repository was forked from https://github.com/ynab/system-info-action. Please consider [sponsoring](https://github.com/sponsors/kenchan0130) the original author.

## Outputs

Name|Description
---|---
`cpu-core`|Logical CPU core size
`cpu-model`|Logical CPU model name
`hostname`|The host name of the operating system
`kernel-release`|The kernel release
`name`|The operating system (distribution) name
`platform`|The operating system identity
`release`|The operating system (distribution) release
`totalmem`|the total amount of system memory in bytes


## Example usage

```yaml
  - uses: ynab/system-info-action@v1
    id: system-info
  - uses: actions/cache@v3
    with:
      path: ~/.npm
      key: ${{ runner.os }}-${{ steps.system-info.outputs.release }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: ${{ runner.os }}-${{ steps.system-info.outputs.release }}-node
```