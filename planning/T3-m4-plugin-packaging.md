---
id: T3-m4-plugin-packaging
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M4-gmail-attachments
status: active
---

# T3 — package the server as a Claude Code plugin (beta) for the ExFu marketplace

Principles inherited from `T2-core-server` §1 (secrets apart, core/transport
split, bring-your-own OAuth client) and `T1-top-level`. Operator request
2026-09-07: package as a proper plugin following the conventions of the
other ExFu plugins, labelled beta, and add it to `exfu-marketplace`.
Marketplace wiring (GitHub repo, pin) is the orchestrator's work, not this
brief's.

## 1. Environment (pinned)

- Repo root (git worktree):
  `/Users/al/Studio/projects/exfu-multiaccount/.claude/worktrees/gmail-attachments-ea1d2d`, macOS.
- Node v25.9.0, npm 11.12.1, TypeScript ^5.9.3, vitest ^2.1.9. Baseline:
  15 test files, 101 tests, green. `npm run build` = tsc → `dist/`.
- Marketplace convention (from `ExFu/agent-plan-visualiser` and
  `ExFu/agent-library`): the plugin lives in `plugins/<plugin-name>/`
  inside its own repo and is installed by sparse clone of that
  subdirectory only — nothing outside it, and no `node_modules`, reaches
  users. Plugin dir contains `.claude-plugin/plugin.json`, `LICENSE`,
  `README.md`, `skills/<skill>/SKILL.md`, and here also `.mcp.json` and a
  committed self-contained bundle.
- Measured: bundling `src/index.ts` with esbuild 0.21.5 against
  `googleapis` yields 38 MB (every Google API included); against the
  modular `@googleapis/*` packages the same imports bundle to 1.5 MB.
  Bundling needs the ESM banner
  `import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);`
  and `--external:canvas` (optional native dep of pdfjs). A bundle built
  this way already served `tools/list` with 19 tools over stdio.

## 2. Deliverable

1. **Modular Google packages.** Replace the `googleapis` dependency with
   `@googleapis/gmail@^18.0.0`, `@googleapis/drive@^22.0.0`,
   `@googleapis/calendar@^16.0.0`, `@googleapis/docs@^10.0.0`, and
   `google-auth-library@^11.0.2` (remove `googleapis` from
   package.json). In each provider file:
   - `gmail.ts`: `import { gmail as gmailApi, type gmail_v1 } from "@googleapis/gmail"`;
     client factory becomes `gmailApi({ version: "v1", auth: client })`.
   - `drive.ts`, `calendar.ts`, `docs.ts`: same pattern with `drive`,
     `calendar`, `docs` from their packages (`drive_v3`, `calendar_v3`,
     `docs_v1` types).
   - `auth.ts`: `import { OAuth2Client } from "google-auth-library"` in
     place of `google.auth.OAuth2`; the `Auth.OAuth2Client` type used
     across `src/` becomes `OAuth2Client` from `google-auth-library`.
     Behaviour is unchanged.
   - Tests: every `vi.mock("googleapis", () => ({ google: { gmail: f } }))`
     becomes `vi.mock("@googleapis/gmail", () => ({ gmail: f }))` (same
     for drive/calendar/docs); mocks of `google.auth.OAuth2` become mocks
     of `google-auth-library`'s `OAuth2Client`. Test assertions stay the
     same.
2. **Bundle script.** Add `esbuild@^0.21.5` to devDependencies and
   `scripts/bundle.mjs` (Node, ESM) that builds two files with esbuild's
   JS API: entry `src/index.ts` → `plugins/exfu-multiaccount/server/index.mjs`
   and entry `src/cli.ts` → `plugins/exfu-multiaccount/server/cli.mjs`,
   with `bundle: true, platform: "node", format: "esm", target: "node20",
   minify: false, sourcemap: false, external: ["canvas"]`, the banner
   above, and `legalComments: "none"`. package.json gains
   `"bundle": "npm run build && node scripts/bundle.mjs"`. Each output
   must start with `#!/usr/bin/env node` (use esbuild `banner` ordering:
   shebang line first, then the createRequire line). Commit the built
   bundles: they are the shipped artefact. `.gitignore` already ignores
   `dist/`; the bundle dir is named `server/`, so nothing to change there.
3. **Plugin directory** `plugins/exfu-multiaccount/`:
   - `.claude-plugin/plugin.json`:
     ```json
     {
       "name": "exfu-multiaccount",
       "version": "0.1.0-beta.1",
       "description": "BETA — ExFu multi-account Google workspace MCP server: Gmail (search, read, attachments, drafts), Drive, Docs and Calendar across several Google accounts at once, each routed by an explicit account alias. Local-only; your own OAuth client; tokens never leave your machine.",
       "author": { "name": "exfu.ai", "email": "al@exfu.ai", "url": "https://exfu.ai" },
       "repository": "https://github.com/ExFu/multiaccount",
       "license": "Proprietary",
       "keywords": ["exfu", "google", "gmail", "drive", "calendar", "multi-account", "mcp", "beta"]
     }
     ```
   - `.mcp.json`:
     ```json
     {
       "mcpServers": {
         "exfu-multiaccount": {
           "command": "node",
           "args": ["${CLAUDE_PLUGIN_ROOT}/server/index.mjs"]
         }
       }
     }
     ```
   - `LICENSE`: copy verbatim from
     `/Users/al/Studio/projects/agent-plan-tracker/plugins/agent-plan-visualiser/LICENSE`
     (read it; it is the ExFu proprietary licence text, 58 lines).
   - `README.md` (plugin-facing, ≤ 120 lines): what it is; **Beta**
     status paragraph near the top (surface may change, operator-run
     smoke only, report issues at the repo); requirements (Node ≥ 20;
     a Google Cloud OAuth desktop client of your own); setup — config dir
     `~/.exfu-multiaccount/` (override `EXFU_MULTIACCOUNT_HOME`),
     `config.json` pointing at the client-secret JSON (copy the exact
     shape from the root README "Configure" section), then
     `node "$CLAUDE_PLUGIN_ROOT/server/cli.mjs" add-account <alias> --info "..."`
     explained as: find the plugin root via the path Claude Code reports
     for the plugin, or run the same command from a checkout; the
     complete tool list grouped read / write / delete / attachments,
     with the `"all"` fan-out rule and the write receipt rule; a note
     that install gives you a server named `exfu-multiaccount` and any
     hand-configured MCP entry of the same name should be removed.
   - `skills/exfu-multiaccount/SKILL.md` with frontmatter
     `name: exfu-multiaccount` and a `description` that triggers on
     multi-account Google/Gmail/Drive/Calendar questions, "which account",
     "search all my inboxes", attachments, drafts, and on first-run setup
     ("set up exfu-multiaccount", "add a Google account"). Body (≤ 150
     lines): the account-alias routing rule and `"all"` fan-out; the
     attachment depth choices (metadata / preview / text / save / base64)
     and when to use each; write-tool safety (one alias, receipts, drafts
     never send, deletes are trash/draft-only); the setup walkthrough
     (config, add-account, re-auth when a tool reports the account needs
     re-authorization); and a short troubleshooting list. Reference tools
     by exact name. No implementation detail.
4. **Root README**: replace the "Claude Code MCP configuration" JSON
   block's hard-coded path with a generic `<path-to-checkout>/dist/index.js`
   and add a short "Install as a plugin" section pointing at the
   marketplace command
   `/plugin install exfu-multiaccount@exfu-marketplace` and at
   `plugins/exfu-multiaccount/README.md`. Mention `npm run bundle` under
   "Install and build" as the step that refreshes the plugin bundles.
5. **Tests**: add `tests/bundle.test.ts` that, when
   `plugins/exfu-multiaccount/server/index.mjs` exists, spawns it with
   `node`, performs the initialize / initialized / tools/list stdio
   exchange (protocolVersion 2025-06-18) with a 20 s timeout, and asserts
   19 tools including `gmail_get_attachment`; skips (with `it.skip`) when
   the bundle is absent. Set `EXFU_MULTIACCOUNT_HOME` to a temp dir for
   the child.

## 3. Commands (exact)

```
npm install
npm run build
npm test
npm run bundle
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0; `grep -rn '"googleapis"' src tests package.json` returns nothing.
2. `npm test` exits 0 after `npm run bundle`; the bundle test runs (not skipped) and passes; all 101 baseline tests pass.
3. `ls -la plugins/exfu-multiaccount/server/` shows `index.mjs` and `cli.mjs`, each under 4 MB.
4. `node plugins/exfu-multiaccount/server/cli.mjs` with no args prints the usage text and exits 1.
5. `python3 -c "import json;json.load(open('plugins/exfu-multiaccount/.claude-plugin/plugin.json'));json.load(open('plugins/exfu-multiaccount/.mcp.json'))"` exits 0.
6. `git status --porcelain` lists only intended files.

## 5. Out of scope (do not touch)

- No GitHub repo creation, no marketplace edits (the orchestrator does
  both); no changes to tool behaviour; no new tools; no HTTP transport.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
