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
