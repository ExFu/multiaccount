---
id: T2-core-server
plan_kind: thematic
tier: 2
status: active
---

# T2 — core server: accounts, tokens, Google provider, MCP surface

Spawned from `T1-top-level` §3 theme "Core server".

## 1. Principles (binding)

1. **Account registry is the one true abstraction.** A registry of
   `{alias, provider, email, scopes, extra_info, added_at}` — metadata only,
   never secrets. Aliases are human labels ("personal", "buddyapps"); every
   data tool routes by alias. `extra_info` is free text the model reads to
   know what each account is for (pattern from mcp-gsuite).
2. **Secrets live apart from metadata.** v1: one token file per account,
   `0600`, under the config dir. The store is behind an interface so an OS
   keychain backend (pattern from Softeria) can replace files without
   touching callers. Tokens never appear in tool output, logs, or errors.
3. **Explicit account parameter, plus fan-out.** Every data tool takes
   `account` (alias). `"all"` fans out across every account of the relevant
   provider and tags each result with its source alias. No hidden default
   account while >1 account exists.
4. **Bring-your-own OAuth client.** The operator supplies their own Google
   Cloud OAuth client (client-secret JSON path in config). The server never
   ships a shared client ID. Auth is the loopback-redirect flow
   (localhost ephemeral port), refresh handled automatically, re-auth
   surfaced clearly when refresh tokens expire (Google testing-mode 7-day
   expiry is expected during development).
5. **Core/transport split.** `src/` core (registry, tokens, providers,
   tools-as-functions) must not import transport code. The stdio MCP entry
   is a thin binding; a future HTTP entry binds the same core.
6. **Read-only v1** per `T1-top-level` §5 Q2 ruling.
7. **Provider abstraction stays minimal.** Google is concrete; the only
   provider-agnostic surface v1 commits to is the registry + token-store
   interface. No speculative provider frameworks (YAGNI until Microsoft).

## 2. Shape

- Node ≥ 20, TypeScript, `@modelcontextprotocol/sdk`, `googleapis`,
  `vitest` for tests. Config dir `~/.exfu-multiaccount/` (overridable via
  `EXFU_MULTIACCOUNT_HOME`), holding `config.json`, `accounts.json`,
  `tokens/<alias>.json`.
- Tool surface grows per milestone; M1 ships `accounts_list`,
  `accounts_add`, `gmail_search`, `gmail_get_message`.
- Unit tests mock the filesystem and Google APIs; no network in CI.

## 3. Glossary

- **alias** — operator-chosen short name for one connected account; the
  routing key on every tool call.
- **fan-out** — running one query against all registered accounts and
  merging results, each tagged with its alias.
- **BYO client** — the operator's own Google Cloud OAuth client used for
  consent; keeps the app "personal use" in Google's eyes (no CASA).

## 4. Rulings (2026-09-01, operator acceptance — carte-blanche grant, this session)

Accepted by operator (al) under the session carte-blanche grant of
2026-09-01. No open questions at acceptance; token-store keychain upgrade
and HTTP transport are deliberately deferred, not gaps.

## 5. Write tools (2026-09-01 append — M3)

`T1-top-level` §5 Q2 ruled that writes arrive "later behind an explicit
confirmation design". M3 is that later. Principle 6 ("read-only v1") is
discharged, not violated: v1 shipped read-only, and writes now open under
these binding principles:

- **W1 — writes never fan out.** Every write tool requires one explicit
  account alias; `"all"` is rejected with an error. Principle 3's fan-out
  applies to reads only.
- **W2 — no send, ever.** Email writes stop at drafts. No code path may
  call any Gmail send API. Google offers no drafts-without-send scope
  (`gmail.compose` technically permits sending), so this guarantee is
  enforced entirely at the tool layer: the send call does not exist in
  this codebase. Calendar writes never email attendees in M3:
  `sendUpdates: "none"` on every insert/patch.
- **W3 — every write returns a receipt.** Acting alias + account email +
  resource id + web link, so the client can show what was written where.
  Wrong-account writes are the project's scariest failure mode (T1 §5
  Q2); the receipt makes them immediately visible.
- **W4 — write tools declare themselves.** MCP tool annotations carry
  `readOnlyHint: false` on all writes and `destructiveHint: true` where
  existing content is replaced. Confirmation is the client's ceremony;
  the server's job is honest labeling.
- **W5 — scopes widen only as far as M3 requires.** New scope set:
  `gmail.readonly`, `gmail.compose`, `drive` (full — required to edit
  files the app did not create; `drive.file` cannot), `calendar.events`.
  `drive.readonly` and `calendar.readonly` drop out as subsumed.
- **W6 — deletes are narrowest-destructive (2026-09-01 addendum,
  operator post-smoke ruling in `M3-writes-live`).** Where a delete
  tool exists: Drive deletion means *trash* (recoverable; no
  permanent-delete tool exists), Gmail deletion touches *drafts only*
  (no code path may call any message delete/trash API — the W2
  construction, applied to deletion), and calendar deletion never
  notifies attendees (`sendUpdates: "none"`). W1, W3, and W4 apply to
  deletes as to all writes; deletes always carry
  `destructiveHint: true`.

## 6. Attachments (2026-09-05 append — M4)

Operator request 2026-09-05: agents must be able to find, inspect, and
retrieve Gmail attachments, and attach files to drafts. Binding
principles for that surface:

- **A1 — the caller chooses depth.** The calling agent knows whether it
  is running a wide sweep or a focused enquiry. Every attachment read
  therefore exposes an explicit depth choice — existence and metadata,
  a bounded text preview, full extracted text, or raw bytes — and
  defaults to the cheapest option. The server never guesses.
- **A2 — bytes go to disk, not to context.** Raw attachment content is
  written to a caller-supplied local directory and the tool returns
  the path plus metadata. Inline base64 is available only under a hard
  size cap; above it the tool refuses and points at the save mode.
- **A3 — text extraction is best-effort and honest.** Text mode covers
  plain-text families, PDF and DOCX. Unsupported types return a clear
  "not text-extractable" result naming the MIME type, never silently
  empty text. Extraction failures surface as errors, never as blank
  documents.
- **A4 — inline images and Drive links are opt-in.** Inline `cid:`
  images are excluded from attachment listings unless the caller asks;
  Google Drive links found in a message body are surfaced only when the
  caller asks, as file ids for the existing Drive tools, never fetched
  by the Gmail tools.
- **A5 — outgoing attachments obey the write principles.** Attaching
  files to a draft is a write: W1–W4 apply unchanged, W2 (no send)
  stays absolute, and the total attachment size is capped below
  Gmail's 25 MB message limit so drafts never fail late.
- **A6 — no new scopes.** `gmail.readonly` already covers attachment
  reads and `gmail.compose` covers attachments on drafts. No account
  re-consent is required for M4.
