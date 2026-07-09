---
name: Dependency audit overrides
description: How this monorepo resolves npm audit vulnerabilities without breaking transitive dependency trees
---

When `pnpm audit` flags transitive vulnerabilities, fix them via the `overrides` section in `pnpm-workspace.yaml` rather than trying to bump direct deps individually.

- Simple package name overrides (e.g. `lodash: "^4.18.1"`) apply globally to every occurrence of that package.
- When two different major versions of the same package are needed in different parts of the tree (e.g. `vite` needs `picomatch@4.x` but `micromatch` needs `picomatch@2.x`), use a scoped selector: `"micromatch>picomatch": "^2.3.2"`. pnpm cannot parse selectors longer than two segments (`"fast-glob>micromatch>picomatch"` fails with `ERR_PNPM_INVALID_SELECTOR`) — keep overrides to `parent>child` form.
- After changing overrides, run `pnpm install`, then verify with `pnpm audit --json` (check `metadata.vulnerabilities` all zero).

**Why:** running dev servers/workflows cache resolved paths to the old package version (e.g. Vite errors with "Cannot find module .../vite@7.3.1/.../dist.js" after bumping to 7.3.6 in the lockfile). A `pnpm install` alone does not fix already-running processes.

**How to apply:** after any override/version bump affecting a package used by a running workflow (vite, esbuild, etc.), restart the affected workflow(s) before considering the fix verified — don't rely on typecheck alone.
