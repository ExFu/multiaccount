---
id: T3-m3-delete-tools
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M3-writes-live
status: active
---

# T3 — Drive/Calendar/Gmail delete tools (M3 slice 3)

Principles inherited from `T2-core-server` §1 and §5 W1–W6 (W6 governs
this slice); ruling from `M3-writes-live` Rulings addendum (2026-09-01
operator post-smoke reversal). Do not restate them in code comments.

## 1. Environment (pinned)

- Repo root (git worktree): `/Users/al/Studio/projects/exfu-multiaccount/.claude/worktrees/mcp-server-gdrive-calendar-email-1193de`, macOS.
- Node v25.9.0, npm 11.12.1. `npm run build` = tsc → `dist/`. Suite
  green: 60 vitest tests across 12 files; server registers 14 tools.
- Slices 1–2 shipped `requireWritableAccount`, the
  `{ account, accountEmail, ...result }` receipt pattern, and the
  `safeAccountError` rewrap on write failures — reuse all three.
- No scope changes: full `drive` covers trash, `calendar.events` covers
  event delete, `gmail.compose` covers draft delete. No re-consent.

## 2. Deliverable

1. **`src/providers/google/drive.ts`** addition:
   - `trashFile(client, fileId)`: `files.update` with `{ fileId,
     requestBody: { trashed: true }, fields:
     "id,name,mimeType,trashed" }`. Return `{ id, name, mimeType,
     trashed: true }`. No permanent-delete function anywhere
     (binding: T2 §5 W6).
2. **`src/providers/google/calendar.ts`** addition:
   - `deleteEvent(client, eventId)`: `events.delete` on `calendarId:
     "primary"` with `sendUpdates: "none"` (binding: W6). The API
     returns no body; return `{ eventId, deleted: true }`.
3. **`src/providers/google/gmail.ts`** addition:
   - `deleteDraft(client, draftId)`: `users.drafts.delete` with
     `{ userId: "me", id: draftId }`. Return `{ draftId,
     deleted: true }`. **Never** call `users.messages.delete`,
     `users.messages.trash`, or any other message-mutating API
     (binding: W6, the W2 construction applied to deletion).
4. **`src/tools.ts`** additions — wrappers `driveTrashFile`,
   `calendarDeleteEvent`, `gmailDeleteDraft`: each resolves via
   `requireWritableAccount`, gets the authed client, calls the provider
   function, returns `{ account: alias, accountEmail: <registry email>,
   ...providerResult }`. On provider failure, throw
   `new Error(safeAccountError(error, alias).error)`. No fan-out.
5. **`src/server.ts`**: register three tools, descriptions ending
   `Requires one explicit account alias; "all" is rejected.`:
   - `drive_trash_file` — `{ account, fileId }`; annotations
     `{ readOnlyHint: false, destructiveHint: true }`; description
     states the file moves to Drive trash and is recoverable there.
   - `calendar_delete_event` — `{ account, eventId }`; annotations
     `{ readOnlyHint: false, destructiveHint: true }`; description
     states attendees are not emailed.
   - `gmail_delete_draft` — `{ account, draftId }`; annotations
     `{ readOnlyHint: false, destructiveHint: true }`; description
     states it deletes a draft only, never messages.
6. **Tests** — `tests/delete-tools.test.ts` (mock googleapis, temp
   `EXFU_MULTIACCOUNT_HOME`, no network, follow existing style):
   - request shapes: `trashed: true` in the files.update body;
     `sendUpdates: "none"` and `calendarId: "primary"` on
     events.delete; `userId: "me"` + draft id on drafts.delete;
   - all three wrappers reject `account: "all"`; a successful receipt
     carries `account` and `accountEmail`;
   - the gmail mock exposes spies for `messages.delete`,
     `messages.trash`, `messages.send`, `drafts.send` and asserts none
     is ever called; the drive mock asserts `files.delete` is never
     called.
7. **README.md**: a short delete-tools addition to the write-tools
   section: trash semantics for Drive (recoverable), draft-only
   deletion for Gmail, no attendee emails for calendar.

## 3. Commands (exact)

```
npm run build
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0.
2. `npm test` exits 0; the pre-existing 60 tests stay green.
3. Stdio smoke: pipe `initialize` (protocolVersion 2025-06-18) then
   `notifications/initialized` then `tools/list` into
   `node dist/index.js`; the result must contain exactly 17 tools —
   the existing fourteen plus drive_trash_file, calendar_delete_event,
   gmail_delete_draft.
4. `grep -rn "messages.delete\|messages.trash\|files.delete\|drafts.send\|messages.send" src/`
   returns no matches.

## 5. Out of scope (do not touch)

- No permanent Drive deletion, no Drive `emptyTrash`, no Gmail message
  deletion/trashing, no calendar-level (whole-calendar) deletion; no
  send tools; no scope changes; no HTTP transport.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `scripts/reauth.mjs`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
