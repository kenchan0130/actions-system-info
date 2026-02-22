import { build } from "esbuild";
import esbuildPluginLicense from "esbuild-plugin-license";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node24",
  outdir: "lib",
  outbase: "src",
  format: "cjs",
  minify: true,
  sourcemap: true,
  legalComments: "none",
  plugins: [
    esbuildPluginLicense({
      banner: "",
      thirdParty: {
        output: {
          file: "LICENSE",
          template(dependencies) {
            return dependencies
              .map((dep) => {
                return `${dep.packageJson.name}\n${dep.packageJson.license}\n${dep.licenseText.trim()}`;
              })
              .join("\n\n");
          },
        },
      },
    }),
  ],
});
