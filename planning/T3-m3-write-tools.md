---
id: T3-m3-write-tools
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M3-writes-live
status: active
---

# T3 — Drive/Calendar/Gmail write tools (M3 slice 1)

Principles inherited from `T2-core-server` §1 (registry routing,
secrets-apart, core/transport split) and §5 W1–W5 (write safety);
rulings from `T1-top-level` §5 and `M3-writes-live` Rulings. Do not
restate them in code comments.

## 1. Environment (pinned)

- Repo root (git worktree): `/Users/al/Studio/projects/exfu-multiaccount/.claude/worktrees/mcp-server-gdrive-calendar-email-1193de`, macOS.
- Node v25.9.0, npm 11.12.1. Package builds clean (`npm run build` =
  tsc → `dist/`); 36 vitest tests across 7 files pass.
- Existing modules to extend, not rewrite: `src/tools.ts`,
  `src/server.ts`, `src/providers/google/auth.ts`,
  `src/providers/google/drive.ts`, `src/providers/google/calendar.ts`,
  `src/providers/google/gmail.ts`, `scripts/reauth.mjs`.
- Tool registration pattern: `server.registerTool(name, {title,
  description, inputSchema (zod)}, handler)` returning
  `toolResult(JSON)` — mirror it exactly.

## 2. Deliverable

1. **Scopes** — in `src/providers/google/auth.ts`, set `GOOGLE_SCOPES`
   to exactly (full URLs, this order):
   `gmail.readonly`, `gmail.compose`, `drive`, `calendar.events`.
   Nothing else in auth.ts changes.
2. **reauth store fix** — in `scripts/reauth.mjs`, the email-mismatch
   path calls `new FileTokenStore().delete(alias)`, which since the M2
   encrypted store deletes a plaintext file that no longer exists,
   leaving the wrong account's (encrypted) tokens live while claiming
   "Tokens discarded". Replace the `FileTokenStore` import/instantiation
   with `createTokenStore()` from `../dist/accounts/storeFactory.js` so
   the delete hits the real store. No other behavior change.
3. **`src/providers/google/drive.ts`** additions:
   - `createFile(client, options)` with options `{ name, content,
     mimeType?, folderId?, asGoogleDoc? }`: `files.create` with
     `requestBody: { name, ...(folderId ? { parents: [folderId] } : {}),
     ...(asGoogleDoc ? { mimeType:
     "application/vnd.google-apps.document" } : {}) }`, media
     `{ mimeType: mimeType ?? "text/plain", body: content }`, `fields:
     "id,name,mimeType,webViewLink"`. Return `{ id, name, mimeType,
     webViewLink? }`.
   - `updateFileContent(client, fileId, content, contentMimeType?)`:
     `files.get` metadata first (`fields: "id,name,mimeType"`). Routing
     by existing mimeType:
     - `application/vnd.google-apps.document` → `files.update` with
       media `{ mimeType: contentMimeType ?? "text/plain", body:
       content }` (Drive converts and replaces the doc body).
     - Sheets/Slides (`…apps.spreadsheet`, `…apps.presentation`) →
       throw `Error("Updating Google Sheets/Slides is not supported.")`.
     - `text/*` or `application/json` → `files.update` with media
       `{ mimeType: contentMimeType ?? <existing mimeType>, body:
       content }`.
     - anything else → throw
       `Error("Updating binary files is not supported.")`.
     `fields: "id,name,mimeType,modifiedTime,webViewLink"`. Return
     `{ id, name, mimeType, modifiedTime?, webViewLink? }`.
4. **`src/providers/google/calendar.ts`** additions:
   - `createEvent(client, input)` with input `{ summary, start, end,
     timeZone?, description?, location?, attendees?: string[] }`.
     start/end are each either an ISO dateTime or an all-day date;
     detect all-day via `/^\d{4}-\d{2}-\d{2}$/` and build
     `{ date }` vs `{ dateTime, ...(timeZone ? { timeZone } : {}) }`.
     `events.insert` on `calendarId: "primary"` with `sendUpdates:
     "none"` (binding: T2 §5 W2) and attendees mapped to
     `[{ email }]`. Return the existing `CalendarEvent` mapping plus
     `htmlLink?`.
   - `updateEvent(client, eventId, patch)` where patch is the same
     input shape with every field optional: `events.patch` on
     `"primary"`, `sendUpdates: "none"`, requestBody containing only
     the provided fields (same date-vs-dateTime handling). Return the
     same shape as `createEvent`.
5. **`src/providers/google/gmail.ts`** addition:
   - `createDraft(client, input)` with input `{ to?: string[], cc?:
     string[], bcc?: string[], subject?, body, replyToMessageId? }`.
     - If `replyToMessageId` (a Gmail message id) is given: fetch that
       message with `format: "metadata"`, `metadataHeaders:
       ["Message-ID", "Subject", "From", "To", "Reply-To"]`; take
       `threadId` from it; set `In-Reply-To` and `References` to its
       Message-ID header; default `subject` to its subject prefixed
       `"Re: "` (do not double an existing `Re:`); default `to` to its
       Reply-To header, else its From.
     - Validate: `to` (explicit or derived) must be non-empty;
       `subject` (explicit or derived) must be non-empty.
     - Build an RFC 2822 message: `To`, optional `Cc`/`Bcc`,
       `Subject`, optional `In-Reply-To`/`References`,
       `MIME-Version: 1.0`, `Content-Type: text/plain; charset=UTF-8`,
       blank line, body. Base64url-encode the whole message as `raw`.
     - `users.drafts.create` with `{ userId: "me", requestBody:
       { message: { raw, ...(threadId ? { threadId } : {}) } } }`.
     - Return `{ draftId, messageId, threadId?, to: string[],
       subject }` (ids from the created draft response).
     - **Never** call `users.messages.send` or `users.drafts.send`
       anywhere (binding: T2 §5 W2).
6. **`src/tools.ts`** additions:
   - Helper `requireWritableAccount(account: string)`: throws
     `Error('Write tools require one explicit account alias; "all" is
     not permitted.')` when `account === "all"`, else returns
     `getAccount(account)` (which already throws on unknown aliases).
   - Wrappers `driveCreateFile`, `driveUpdateFile`,
     `calendarCreateEvent`, `calendarUpdateEvent`, `gmailCreateDraft`:
     each resolves the account via `requireWritableAccount`, gets the
     authed client, calls the provider function, and returns a single
     receipt object `{ account: alias, accountEmail: <registry email>,
     ...providerResult }` (binding: T2 §5 W3). No fan-out, no array
     returns. On provider failure, throw an `Error` whose message is
     the `error` text `safeAccountError` would produce (never raw
     Google errors or tokens).
7. **`src/server.ts`**: register five tools, each description ending
   with the sentence `Requires one explicit account alias; "all" is
   rejected.`:
   - `drive_create_file` — `{ account, name, content, mimeType?,
     folderId?, asGoogleDoc? }`; annotations `{ readOnlyHint: false,
     destructiveHint: false }`.
   - `drive_update_file` — `{ account, fileId, content,
     contentMimeType? }`; annotations `{ readOnlyHint: false,
     destructiveHint: true }` (replaces file content).
   - `calendar_create_event` — `{ account, summary, start, end,
     timeZone?, description?, location?, attendees?: string[] }`;
     annotations `{ readOnlyHint: false, destructiveHint: false }`;
     description also states no attendee emails are sent.
   - `calendar_update_event` — `{ account, eventId }` plus the create
     fields all optional; annotations `{ readOnlyHint: false,
     destructiveHint: true }`.
   - `gmail_create_draft` — `{ account, to?: string[], cc?: string[],
     bcc?: string[], subject?, body, replyToMessageId? }`; annotations
     `{ readOnlyHint: false, destructiveHint: false }`; description
     also states the draft is saved, never sent.
8. **Tests** (mock googleapis + temp `EXFU_MULTIACCOUNT_HOME`, no
   network — follow existing test style):
   - `tests/drive-write.test.ts`: create request shape (parents,
     asGoogleDoc mimeType, media body); update routing — Doc converts,
     Sheets/Slides rejected, text updates, binary rejected.
   - `tests/calendar-write.test.ts`: all-day vs dateTime detection;
     `sendUpdates: "none"` asserted on both insert and patch; patch
     body contains only provided fields.
   - `tests/gmail-draft.test.ts`: decode the `raw` passed to the mock
     and assert headers/body; reply case sets threadId, In-Reply-To,
     References, `Re:` subject, derived `to`; mock exposes
     `messages.send`/`drafts.send` spies and asserts they are never
     called.
   - `tests/write-guard.test.ts`: all five wrappers reject
     `account: "all"`; a successful write receipt carries `account`
     and `accountEmail`.
9. **Docs**: README.md — document the five tools, the new scope set,
   and that every existing account must re-consent via
   `node scripts/reauth.mjs`. package.json `description` — replace
   with `"A local multi-account Google workspace MCP server"` (the
   "read-only" claim is now false).

## 3. Commands (exact)

```
npm run build
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0.
2. `npm test` exits 0; the pre-existing 36 tests stay green.
3. Stdio smoke: pipe `initialize` (protocolVersion 2025-06-18) then
   `notifications/initialized` then `tools/list` into
   `node dist/index.js`; the result must contain exactly these 12
   tools: accounts_list, accounts_add, gmail_search,
   gmail_get_message, drive_search, drive_read_file, calendar_events,
   drive_create_file, drive_update_file, calendar_create_event,
   calendar_update_event, gmail_create_draft.
4. `grep -rn "drafts.send\|messages.send" src/` returns no matches.

## 5. Out of scope (do not touch)

- No Google Docs structured edits (that is `T3-m3-docs-edits`); no
  delete tools; no send tools; no HTTP transport; no Microsoft/Dropbox.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
