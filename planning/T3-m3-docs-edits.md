---
id: T3-m3-docs-edits
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M3-writes-live
status: active
---

# T3 — Google Docs structured edits (M3 slice 2)

Principles inherited from `T2-core-server` §1 and §5 W1–W4; rulings
from `M3-writes-live` Rulings (structured Docs edits chosen
explicitly). Builds on `T3-m3-write-tools` (slice 1) being merged: the
full `drive` scope from slice 1 also authorizes the Google Docs API, so
this slice needs **no** scope change and no re-consent of its own.

## 1. Environment (pinned)

- Repo root (git worktree): `/Users/al/Studio/projects/exfu-multiaccount/.claude/worktrees/mcp-server-gdrive-calendar-email-1193de`, macOS.
- Node v25.9.0, npm 11.12.1. `npm run build` = tsc → `dist/`. Slice 1
  leaves the suite green with 12 registered tools.
- `googleapis` (`^137.1.0`) ships `docs_v1`; no new dependency.

## 2. Deliverable

1. **`src/providers/google/docs.ts`** (new module, pattern-match
   `drive.ts`):
   - `docsClient(client)` via `google.docs({ version: "v1", auth })`.
   - `appendText(client, documentId, text)`:
     `documents.get` first (`fields: "documentId,title,revisionId"`),
     then `documents.batchUpdate` with `writeControl:
     { requiredRevisionId: <fetched revisionId> }` and requests
     `[{ insertText: { endOfSegmentLocation: { segmentId: "" },
     text } }]`. Return `{ documentId, title }`.
   - `replaceText(client, documentId, find, replaceWith,
     matchCase = true)`: same get-then-batchUpdate shape with requests
     `[{ replaceAllText: { containsText: { text: find, matchCase },
     replaceText: replaceWith } }]`. Return `{ documentId, title,
     occurrencesChanged }` where occurrencesChanged =
     `response.data.replies?.[0]?.replaceAllText?.occurrencesChanged
     ?? 0`.
   - If batchUpdate fails because the revision moved between get and
     update (HTTP 400 mentioning the revision), rethrow as
     `Error("Document changed while editing; re-read and retry.")`.
2. **`src/tools.ts`**: wrappers `docsAppendText`, `docsReplaceText`
   using the slice-1 `requireWritableAccount` helper and returning the
   same single-receipt shape `{ account, accountEmail,
   ...providerResult }`. No fan-out.
3. **`src/server.ts`**: register, descriptions ending `Requires one
   explicit account alias; "all" is rejected.` and noting the target
   must be a Google Doc:
   - `docs_append_text` — `{ account, documentId, text }`; annotations
     `{ readOnlyHint: false, destructiveHint: false }`.
   - `docs_replace_text` — `{ account, documentId, find, replaceWith,
     matchCase? (default true) }`; annotations `{ readOnlyHint: false,
     destructiveHint: true }`.
4. **Tests** — `tests/docs.test.ts` (mock googleapis, temp
   `EXFU_MULTIACCOUNT_HOME`, no network): batchUpdate request shapes
   for both operations including `writeControl.requiredRevisionId`
   threading; occurrencesChanged mapping (present and absent);
   revision-conflict rethrow message; both wrappers reject
   `account: "all"`.
5. **README.md**: document both tools; note they act only on Google
   Docs and need no additional consent beyond slice 1's scope set.

## 3. Commands (exact)

```
npm run build
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0.
2. `npm test` exits 0; all pre-existing tests stay green.
3. Stdio smoke: pipe `initialize` (protocolVersion 2025-06-18) then
   `notifications/initialized` then `tools/list` into
   `node dist/index.js`; the result must contain exactly 14 tools —
   the slice-1 twelve plus docs_append_text and docs_replace_text.

## 5. Out of scope (do not touch)

- No Sheets/Slides APIs; no Docs read tools (drive_read_file already
  exports Doc text); no styling/formatting requests beyond the two
  specified; no delete tools; no send tools.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `scripts/reauth.mjs`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
