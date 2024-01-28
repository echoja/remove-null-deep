import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
  clean: true,
  sourcemap: true,
  legacyOutput: true,
  entryPoints: ["src/index.ts"],
});
