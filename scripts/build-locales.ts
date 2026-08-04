/**
 * Bundles the generated per-locale entries (src/locales/**, produced by
 * generate-locales.ts) into dist/locales/** in both formats. Each entry is
 * built separately so every output file is fully self-contained — no shared
 * chunks for consumers' bundlers to trip over.
 */

import type { LanguageCode } from "../src/types";

const LOCALES: readonly LanguageCode[] = ["en", "uz", "uzc", "ru"];

const targets = LOCALES.flatMap((locale) => [
  { entry: `./src/locales/${locale}.ts`, outdir: "./dist/locales" },
  { entry: `./src/locales/metro/${locale}.ts`, outdir: "./dist/locales/metro" },
]);

const formats = [
  { format: "esm", naming: "[dir]/[name].js" },
  { format: "cjs", naming: "[dir]/[name].cjs" },
] as const;

for (const { entry, outdir } of targets) {
  for (const { format, naming } of formats) {
    const result = await Bun.build({
      entrypoints: [entry],
      outdir,
      format,
      target: "node",
      naming: { entry: naming },
    });
    if (!result.success) {
      console.error(`Build failed for ${entry} (${format}):`);
      for (const log of result.logs) console.error(log);
      process.exit(1);
    }
  }
}

console.log(`Built ${targets.length * formats.length} locale bundles in dist/locales/`);
