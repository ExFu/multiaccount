---
id: T1-top-level
plan_kind: thematic
tier: 1
status: active
---

# T1 — exfu-multiaccount: top-level intent

## 1. Why

Every existing AI-assistant connector for Google (and Dropbox, Microsoft, …)
assumes one user = one account. Real adults hold several Google accounts —
personal, work, community orgs. The operator (Al) needs an AI assistant that
can see and search **all** of his inboxes, drives, and calendars at once,
locally, now. Existing single-account connectors architecturally cannot do
this: platform-held OAuth grants carry exactly one identity. The insight this
project is built on: **multi-account is solved by a server that owns its own
token store**, one credential per account, routed by an explicit account
parameter — not by fighting the platform's auth layer.

Success, in order:
1. Al chats with all his Gmail inboxes from Claude Code, locally.
2. The same server serves Claude Cowork/Desktop; Drive and Calendar join.
3. A remote (streamable-HTTP) deployment serves ChatGPT and claude.ai.
4. Optionally: free self-hosted tier (bring-your-own OAuth client) plus a
   paid hosted tier for non-technical users (we carry CASA).

Audience: initially the operator alone (personal use, own OAuth client in
Google "testing"/unverified-published mode — no CASA obligations). Later,
techie self-hosters, then hosted-tier consumers.

## 2. How (approach)

- **Fresh architecture, harvested plumbing.** Prior art (survey:
  `docs/research/2026-09-01-prior-art-multiaccount-mcp.md`) is reused
  licences-permitting; we do not fork wholesale. Reference implementations:
  aaronsb/google-workspace-mcp (Apache-2.0, per-account token routing) and
  Softeria/ms-365-mcp-server (MIT, cleanest account-parameter conventions).
- **Core library first, transports thin.** Account registry + token store +
  provider clients form a standalone core; the stdio MCP server is a thin
  wrapper, and a remote HTTP wrapper joins later without touching the core.
- **Multi-account ≠ multi-user.** One person, many accounts, one local
  process. No OAuth-2.1 bearer-per-request machinery in the core.
- **Delegated execution.** Implementation and validation delegate to a
  subscription-billed CLI (Codex) under the exfu-delegate contracts; this
  repo's APV event log records all accepted work.

## 3. What (themes → T2s)

- **Core server** (`T2-core-server`) — account registry, token store, Google
  provider, MCP tool surface, stdio transport. First and load-bearing theme.
- **Providers beyond Gmail** (future T2) — Drive, Calendar; then Microsoft
  Graph, Dropbox under the same account registry.
- **Remote & distribution** (future T2) — streamable-HTTP transport, ChatGPT
  connector, hosted tier, CASA posture.

## 4. Open questions (HITL)

- **Q1 — v1 service scope.** Gmail only first, or Gmail+Drive+Calendar
  together?
- **Q2 — write access.** Read-only v1, or send/write from day one?
- **Q3 — language.** TypeScript or Python?

## 5. Rulings (2026-09-01, operator acceptance — carte-blanche grant, this session)

- **Q1 (v1 scope)**: Gmail first. Drive/Calendar are M2+. The operator's
  stated urgent need is inboxes.
- **Q2 (write access)**: read-only scopes in v1 (`gmail.readonly`).
  Send/write arrives later behind an explicit confirmation design —
  send-as-wrong-account is the project's scariest failure mode.
- **Q3 (language)**: TypeScript/Node. Best-maintained prior art is TS; the
  MCP SDK is first-class; single toolchain for local + future remote.
- Accepted by operator (al) under the session carte-blanche grant of
  2026-09-01 ("mark drafts as accepted by me immediately, this session only").
