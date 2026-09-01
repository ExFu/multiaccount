---
id: M3-writes-live
plan_kind: milestone
milestone_index: 3
status: active
---

# M3 — writes live: Drive edits, Docs edits, calendar writes, Gmail drafts

Spawned from `T1-top-level` §5 Q2 ruling ("write arrives later behind an
explicit confirmation design") and the operator's 2026-09-01 request:
agents must be able to edit files in Drive, create calendar entries, and
draft emails. Write-safety principles live in `T2-core-server` §5.

## Definition of done

1. `drive_create_file` and `drive_update_file` work on the operator's
   real accounts per-alias; `"all"` is rejected on every write tool.
2. `docs_append_text` and `docs_replace_text` perform structured edits on
   a real Google Doc without rewriting the whole body.
3. `calendar_create_event` and `calendar_update_event` create and amend
   events on the primary calendar; no attendee emails are sent.
4. `gmail_create_draft` produces drafts (including a threaded reply
   draft) that appear in the account's Drafts folder; nothing sends.
5. All registered accounts re-consented with the M3 scope set
   (`T2-core-server` §5 W5) via `node scripts/reauth.mjs`.

## Sequence

- Follows: M2 (closed 2026-09-01). Precedes: M4 — remote streamable-HTTP
  transport + ChatGPT connector. Resequencing ruling: M2's closure note
  called remote transport "M3"; the operator's 2026-09-01 request
  re-prioritized writes. Remote transport is renumbered M4; no accepted
  plan ever existed under the M3 name, so nothing is superseded.
- T3s targeting this milestone, in build order: `T3-m3-write-tools`,
  then `T3-m3-docs-edits`. Operator real-account smoke closes the
  milestone (operator ceremony).

## Rulings (2026-09-01, operator acceptance — carte-blanche grant, this session)

Operator scoping rulings, recorded from this session's Q&A:

- Drive writes: create + full-content update, **plus** structured Google
  Docs edits (the deeper option was chosen explicitly).
- Calendar writes: create + update; no delete tool — deleting events
  stays a human action.
- Email writes: drafts only, per the original request; no send tool.
- Acceptance: carte-blanche granted for this session's drafts.

Accepted by operator (al) under the 2026-09-01 session carte-blanche
grant. Target-selection: M3 is the target milestone on acceptance.

## Rulings addendum (2026-09-01, operator, post-smoke)

The operator's real-account smoke passed (drafts, calendar events, and
Drive files written by a test agent), but cleanup had to happen outside
this server — and the operator ruled: **delete tools are wanted after
all** ("it's so irritating when tools don't have that"). This supersedes
the earlier "no delete tool" scoping ruling above. Scope of the
reversal, narrowest-destructive (see `T2-core-server` §5 W6):

- `drive_trash_file` — moves a file to Drive trash (recoverable);
  permanent deletion stays out.
- `calendar_delete_event` — removes an event from the primary calendar;
  never emails attendees.
- `gmail_delete_draft` — deletes a **draft** only; message deletion
  stays out entirely.

Definition of done gains item 6: the three delete tools work per-alias
on real accounts (`"all"` still rejected). A third T3 targets this
milestone: `T3-m3-delete-tools`, built after the first two slices.
Closure now additionally awaits a delete-smoke leg; the 2026-09-01
write-smoke evidence stands.
