---
id: T3-m1-server-scaffold
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M1-gmail-live
status: active
---

# T3 — build the multi-account Gmail MCP server (M1 slice)

Principles are inherited, not restated: registry/token/fan-out/BYO-client
rules per `T2-core-server` §1; scope rulings per `T1-top-level` §5.

## 1. Environment (pinned)

- Machine: macOS (darwin), repo root `/Users/al/Studio/projects/exfu-multiaccount`.
- Node v25.9.0 at `/Users/al/.nvm/versions/node/v25.9.0/bin/node`; npm 11.12.1.
- Package manager: npm. No yarn/pnpm.
- The repo currently contains no `package.json` — you create it.

## 2. Deliverable

A TypeScript npm package `exfu-multiaccount` in the repo root:

```
package.json          # name exfu-multiaccount, version 0.1.0, type module,
                      # bin { "exfu-multiaccount": "dist/cli.js" }
tsconfig.json         # strict true, module NodeNext, target ES2022, outDir dist
vitest.config.ts
src/config.ts         # resolveHome(): EXFU_MULTIACCOUNT_HOME env override else
                      # ~/.exfu-multiaccount ; ensures dirs; loads config.json
                      # { googleClientSecretPath: string }
src/accounts/registry.ts  # load/save accounts.json: Account[] where Account =
                      # { alias, provider: "google", email, scopes: string[],
                      #   extraInfo?: string, addedAt: ISO string }
                      # aliases unique, lowercase kebab enforced
src/accounts/tokens.ts    # TokenStore interface { get(alias), set(alias, tokens),
                      # delete(alias) } + FileTokenStore writing
                      # tokens/<alias>.json with mode 0o600
src/providers/google/auth.ts  # loopback OAuth: reads client secret JSON
                      # (path from config), scope
                      # https://www.googleapis.com/auth/gmail.readonly,
                      # ephemeral 127.0.0.1 port, opens browser via `open`,
                      # exchanges code, persists tokens via TokenStore;
                      # getAuthedClient(alias) returns OAuth2Client with
                      # auto-refresh persisted back on "tokens" event
src/providers/google/gmail.ts # searchMessages(client, query, maxResults):
                      # users.messages.list + batched users.messages.get
                      # (format metadata: From, To, Subject, Date + snippet);
                      # getMessage(client, id): format full, body decoded to
                      # text (text/plain preferred, text/html stripped to text)
src/tools.ts          # provider-agnostic core functions the server binds:
                      # accountsList(), accountsAdd(alias, extraInfo?),
                      # gmailSearch(account, query, maxResults=10),
                      # gmailGetMessage(account, messageId)
                      # account="all" fans out per T2 principle 3, each result
                      # tagged { account: alias }; errors per-account, not fatal
src/server.ts         # MCP server via @modelcontextprotocol/sdk (McpServer +
                      # StdioServerTransport): tools accounts_list,
                      # accounts_add, gmail_search, gmail_get_message with zod
                      # input schemas mirroring src/tools.ts
src/index.ts          # entry: starts stdio server
src/cli.ts            # commands: `add-account <alias> [--info "text"]`,
                      # `list-accounts`, `remove-account <alias>` (registry +
                      # token file only) — same core functions, for use
                      # outside MCP
tests/registry.test.ts    # alias validation, uniqueness, round-trip, no
                      # secrets in accounts.json
tests/tokens.test.ts      # file mode 0600, round-trip, delete, missing alias
tests/fanout.test.ts      # "all" fan-out merges + tags results; one account
                      # erroring yields partial results + per-account error
README.md             # update: install, create Google OAuth client (Desktop
                      # app type), config.json setup, add-account walkthrough,
                      # Claude Code mcp config snippet (command: node,
                      # args: [<abs>/dist/index.js])
```

Dependencies: `@modelcontextprotocol/sdk`, `googleapis`, `zod`,
`open`; dev: `typescript`, `vitest`, `@types/node`. Pin nothing else in.
Tests mock `googleapis` and the filesystem (use `EXFU_MULTIACCOUNT_HOME`
pointed at a temp dir) — no network, no real credentials.

## 3. Commands (exact)

```
npm install
npm run build        # tsc
npm test             # vitest run
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0, no TypeScript errors.
2. `npm test` exits 0, all tests pass.
3. `printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"0.0.0"}}}\n' | node dist/index.js | head -1`
   emits a JSON-RPC result naming the server — proves the stdio server boots.
4. `EXFU_MULTIACCOUNT_HOME=$(mktemp -d) node dist/cli.js list-accounts`
   exits 0 and reports zero accounts.

## 5. Out of scope (do not touch)

- No send/write scopes or tools; no Drive/Calendar; no keychain backend;
  no HTTP transport; no packaging/publishing.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`.
- No `git commit`, `git push`, or history-altering commands.
- Do not install global packages or change nvm/node state.
