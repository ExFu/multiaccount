---
id: M2-workspace-live
plan_kind: milestone
milestone_index: 2
status: active
---

# M2 — workspace live: Drive + Calendar across accounts, hardened tokens

Spawned from `T1-top-level` (success criterion 2, first half).

## Definition of done

1. `drive_search` and `drive_read_file` work per-alias and via `"all"`
   fan-out on the operator's real accounts.
2. `calendar_events` lists upcoming/ranged events per-alias and via `"all"`.
3. Token storage is encrypted at rest (AES-256-GCM) with the key held in
   the macOS Keychain; existing plaintext token files migrate transparently.
4. Re-consent with the expanded read-only scopes works via
   `scripts/reauth.mjs` on real accounts.

## Sequence

- Follows: M1 (closed 2026-09-01). Precedes: M3 (remote streamable-HTTP
  transport, ChatGPT).
- T3s targeting this milestone, in build order: `T3-m2-drive-calendar`,
  then `T3-m2-keychain-store`. Operator real-account smoke closes the
  milestone (operator ceremony).

## Rulings (2026-09-01, operator acceptance — carte-blanche grant, this session)

Accepted by operator (al) under the 2026-09-01 session carte-blanche grant.
Target-selection: M2 is the target milestone once this plan is accepted.
