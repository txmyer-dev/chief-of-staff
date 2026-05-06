#!/usr/bin/env bun
/**
 * gemini-link - Link PAI packs to Gemini CLI
 *
 * This tool discovers PAI packs and links them to Gemini CLI's skill discovery path.
 *
 * Usage:
 *   bun gemini-link.ts [--dry-run]
 */

import { existsSync, readdirSync } from "fs";
import { homedir } from "os";
import { join, resolve } from "path";
import { spawnSync } from "child_process";

const DRY_RUN = process.argv.includes("--dry-run");
const PAI_ROOT = resolve(__dirname, "..");
const PACKS_DIR = join(PAI_ROOT, "Packs");

console.log("PAI Gemini CLI Linking Tool");
console.log("---------------------------");

if (!existsSync(PACKS_DIR)) {
  console.error(`Error: Packs directory not found at ${PACKS_DIR}`);
  process.exit(1);
}

const packs = readdirSync(PACKS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

console.log(`Found ${packs.length} packs: ${packs.join(", ")}`);

const links: string[] = [];

for (const pack of packs) {
  const srcDir = join(PACKS_DIR, pack, "src");
  if (existsSync(srcDir)) {
    links.push(srcDir);
  }
}

if (links.length === 0) {
  console.error("No 'src' directories found in packs. Nothing to link.");
  process.exit(1);
}

console.log(`\nLinking ${links.length} skill source(s) to Gemini CLI...`);

for (const linkPath of links) {
  console.log(`\nLinking: ${linkPath}`);
  
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would execute: gemini skills link ${linkPath}`);
    continue;
  }

  const result = spawnSync("gemini", ["skills", "link", linkPath, "--consent"], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(`Error linking ${linkPath}`);
  }
}

console.log("\n---------------------------");
console.log("Linking complete!");
console.log("You can now use these skills in Gemini CLI.");
console.log("Try: gemini skills list");
