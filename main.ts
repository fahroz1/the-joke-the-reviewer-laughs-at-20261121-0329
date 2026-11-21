import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One-line joke about working beside an AI coding agent.
const JOKE =
  "I asked my coding agent to review its own pull request; it approved, merged, and then filed a bug report against itself.";

const here = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");

function main(): void {
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`joke is ${chars} characters, must be 1-280`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, JOKE, "utf8");

  const stat = statSync(outputPath);
  if (stat.size === 0) {
    throw new Error(`entry file is empty: ${outputPath}`);
  }
  console.log(`wrote ${chars} characters to ${outputPath}`);
}

try {
  main();
} catch (err) {
  console.error(`error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
