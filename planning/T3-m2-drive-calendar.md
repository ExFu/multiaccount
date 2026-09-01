---
id: T3-m2-drive-calendar
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M2-workspace-live
status: active
---

# T3 — Drive + Calendar read-only tools (M2 slice 1)

Principles inherited from `T2-core-server` §1 (registry routing, fan-out,
secrets-apart, read-only, core/transport split); rulings from
`T1-top-level` §5. Do not restate them in code comments.

## 1. Environment (pinned)

- Repo root `/Users/al/Studio/projects/exfu-multiaccount`, macOS.
- Node v25.9.0, npm 11.12.1. Existing package builds clean; 17 vitest
  tests pass. `dist/` is the build output, `npm run build` = tsc.
- Existing modules to extend, not rewrite: `src/tools.ts`,
  `src/server.ts`, `src/providers/google/auth.ts`,
  `src/accounts/registry.ts`.

## 2. Deliverable

1. **Central scopes**: in `src/providers/google/auth.ts`, replace the
   single-scope use with an exported `GOOGLE_SCOPES` array:
   `gmail.readonly`, `drive.readonly`, `calendar.readonly` (full URLs).
   `authorizeGoogleAccount` requests all of them. After a successful
   (re)authorization, update the registry entry's `scopes` to
   `GOOGLE_SCOPES` (add a registry helper `updateAccountScopes(alias,
   scopes)`; no-op if the alias is not yet registered, i.e. during
   first-time add-account before registration completes).
2. **`src/providers/google/drive.ts`**:
   - `searchFiles(client, query, maxResults)`: `drive.files.list` with
     `q: query` passed through verbatim (the caller writes Drive query
     syntax), `pageSize: maxResults`, `fields: "files(id,name,mimeType,
     modifiedTime,size,webViewLink,owners(emailAddress))"`. Map to
     `{ id, name, mimeType, modifiedTime?, size?, webViewLink?, owner? }`.
   - `readFile(client, fileId)`: `files.get` metadata first. Google-native
     types export via `files.export`: Docs → `text/plain`, Sheets →
     `text/csv`, Slides → `text/plain`. `text/*`, `application/json`,
     `text/csv` download via `files.get` `alt: "media"`. Cap content at
     262144 bytes (truncate, note truncation in the returned object).
     Other mime types: return metadata plus
     `body: ""` and `note: "binary file; not fetched"`.
   - Return shape `{ id, name, mimeType, body, truncated?: true, note? }`.
3. **`src/providers/google/calendar.ts`**:
   - `listEvents(client, options)` where options =
     `{ timeMin?, timeMax?, query?, maxResults }`: `calendar.events.list`
     on calendar `"primary"`, `singleEvents: true`, `orderBy: "startTime"`,
     defaults timeMin = now when neither bound given. Map to `{ id,
     summary, start, end, location?, organizer?, attendees?: number,
     status? }` (start/end as the raw dateTime-or-date string).
4. **`src/tools.ts`**: add `driveSearch(account, query, maxResults=10)`,
   `driveReadFile(account, fileId)`, `calendarEvents(account, {timeMin?,
   timeMax?, query?, maxResults=25})` — identical fan-out + per-account
   error-isolation semantics to `gmailSearch` (reuse `selectedAccounts` /
   `safeAccountError`; extend the error text generically, e.g. "Request
   failed for account" rather than Gmail-specific wording, keeping the
   existing Gmail message intact or generalized consistently).
5. **`src/server.ts`**: register `drive_search`, `drive_read_file`,
   `calendar_events` with zod schemas mirroring the tool signatures
   (calendar times ISO-8601 strings).
6. **Tests** (mock googleapis + temp `EXFU_MULTIACCOUNT_HOME`, no network):
   - `tests/drive.test.ts`: search result mapping; export-vs-download
     routing decided by mimeType; truncation at the cap; binary skip note.
   - `tests/calendar.test.ts`: event mapping; default timeMin applied.
   - extend `tests/fanout.test.ts` (or a sibling) to cover drive fan-out
     tagging + per-account error isolation.
   - `tests/registry.test.ts` addition: `updateAccountScopes` round-trip.
7. **README.md**: document the three new tools and that existing accounts
   must re-consent via `node scripts/reauth.mjs` to gain the new scopes.

## 3. Commands (exact)

```
npm run build
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0.
2. `npm test` exits 0, all tests pass (existing 17 must stay green).
3. Stdio smoke: pipe `initialize` (protocolVersion 2025-06-18) then
   `notifications/initialized` then `tools/list` into `node dist/index.js`;
   the tools/list result must contain exactly these 7 tools:
   accounts_list, accounts_add, gmail_search, gmail_get_message,
   drive_search, drive_read_file, calendar_events.

## 5. Out of scope (do not touch)

- No write scopes or write tools; no keychain work (that is
  `T3-m2-keychain-store`); no HTTP transport; no Microsoft/Dropbox.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `scripts/reauth.mjs`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
