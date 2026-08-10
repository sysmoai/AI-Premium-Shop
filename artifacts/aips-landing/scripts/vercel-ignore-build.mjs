#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const SAFE_SKIP_PREFIXES = [
  ".github/",
  "docs/",
  "ops/harness/",
  "ops/research/",
];

function changedFilesFromEnvironment() {
  const injected = process.env.AIPS_VERCEL_CHANGED_FILES;
  if (injected == null) return null;
  return injected
    .split(/\r?\n/)
    .map((value) => value.trim().replace(/^\.\//, ""))
    .filter(Boolean);
}

function repositoryRoot() {
  const result = spawnSync("git", ["rev-parse", "--show-toplevel"], {
    encoding: "utf8",
    shell: false,
  });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim() || null;
}

function changedFilesFromGit() {
  const base = String(process.env.VERCEL_GIT_PREVIOUS_SHA ?? "").trim();
  const head = String(process.env.VERCEL_GIT_COMMIT_SHA ?? "HEAD").trim() || "HEAD";
  if (!base) {
    console.log("[vercel-ignore] No VERCEL_GIT_PREVIOUS_SHA; build is required.");
    return null;
  }

  const repoRoot = repositoryRoot();
  if (!repoRoot) {
    console.log("[vercel-ignore] Could not resolve repository root; build is required.");
    return null;
  }

  const result = spawnSync("git", ["diff", "--name-only", "--diff-filter=ACDMRTUXB", base, head, "--"], {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false,
  });
  if (result.error || result.status !== 0) {
    console.log(`[vercel-ignore] Could not compute repository-wide Git diff safely; build is required.${result.error ? ` ${result.error.message}` : ""}`);
    return null;
  }

  return result.stdout
    .split(/\r?\n/)
    .map((value) => value.trim().replace(/^\.\//, ""))
    .filter(Boolean);
}

function isSafeToSkip(file) {
  return SAFE_SKIP_PREFIXES.some((prefix) => file.startsWith(prefix));
}

const changedFiles = changedFilesFromEnvironment() ?? changedFilesFromGit();
if (!changedFiles || changedFiles.length === 0) {
  console.log("[vercel-ignore] No trustworthy non-empty change set; build is required.");
  process.exit(1);
}

const buildRelevant = changedFiles.filter((file) => !isSafeToSkip(file));
if (buildRelevant.length > 0) {
  console.log(`[vercel-ignore] Build required; relevant change(s): ${buildRelevant.slice(0, 10).join(", ")}${buildRelevant.length > 10 ? " ..." : ""}`);
  process.exit(1);
}

console.log(`[vercel-ignore] Skipping Vercel build; ${changedFiles.length} changed file(s) are limited to non-runtime paths.`);
process.exit(0);
