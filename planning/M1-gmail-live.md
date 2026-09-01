---
id: M1-gmail-live
plan_kind: milestone
milestone_index: 1
status: active
---

# M1 — Gmail live: all inboxes, locally, in Claude Code

Spawned from `T1-top-level` (success criterion 1).

## Definition of done

The operator can, on this machine, from Claude Code over stdio MCP:

1. register two or more of their real Google accounts under aliases
   (BYO OAuth client, `gmail.readonly` scope);
2. run `gmail_search` against a single alias and against `"all"`, getting
   results tagged by account;
3. read a full message via `gmail_get_message`;
4. survive a token refresh without re-consenting (within Google's
   testing-mode 7-day window).

## Sequence

- Precedes: M2 (Drive + Calendar tools; keychain token backend),
  M3 (remote streamable-HTTP transport, ChatGPT).
- T3s targeting this milestone: `T3-m1-server-scaffold` (build), followed
  by a manual operator smoke (real accounts) that closes the milestone.
  Closing the milestone is an operator ceremony.

## Rulings (2026-09-01, operator acceptance — carte-blanche grant, this session)

Accepted by operator (al) under the session carte-blanche grant of
2026-09-01. Target-selection: M1 is the named target milestone for
execution beginning 2026-09-01.

## Closure (2026-09-01, operator ceremony)

Definition of done met and operator-confirmed:
1. Three real accounts registered (gmail, buddyapps, whaleybear).
2. Per-alias search and "all" fan-out returned results from all three
   inboxes (orchestrator stdio smoke, zero errors).
3. Full message read verified (body decoded, labels intact).
4. Forced-expiry refresh test passed: token auto-refreshed and re-persisted
   without re-consent.
5. Operator confirmed a separate Claude Code session searched all three
   inboxes through the registered MCP server.

One defect found and fixed during smoke (add-account error transparency,
commit b7322a2). M2 (Drive + Calendar, keychain backend) is next.
