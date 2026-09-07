---
id: M4-gmail-attachments
plan_kind: milestone
milestone_index: 4
status: active
---

# M4 — Gmail attachments: find, inspect, retrieve, attach

Spawned from the operator's 2026-09-05 request ("add the capability for
the gmail connectors to handle attachments; search by, retrieve, etc.")
and the scoping Q&A of the same session. Principles live in
`T2-core-server` §6 (A1–A6).

## Definition of done

1. `gmail_search` and `gmail_get_message` report attachment metadata
   (filename, MIME type, size, ids) on request; inline images and Drive
   links are opt-in per A4.
2. `gmail_search_attachments` returns one row per attachment across one
   or all accounts, with optional bounded text previews (A1).
3. `gmail_get_attachment` retrieves a single attachment in the caller's
   chosen mode: extracted text (bounded or full), saved to a local
   directory, or inline base64 under the cap (A1–A3).
4. `gmail_create_draft` accepts local file paths as attachments and the
   resulting draft shows them in the Drafts folder; nothing sends (A5).
5. Operator real-account smoke: find a PDF invoice by search, read its
   text, save it to disk, and create a draft carrying it.

## Sequence

- Follows: M3 (closed 2026-09-01). Precedes: M5 — remote streamable-HTTP
  transport + ChatGPT connector. Resequencing ruling: M3's closure named
  remote transport "M4"; the operator's 2026-09-05 attachment request
  takes precedence. Remote transport is renumbered M5; no plan file ever
  existed under the M4 name, so nothing is superseded.
- T3s targeting this milestone, in build order:
  `T3-m4-attachment-read`, then `T3-m4-draft-attachments`. Both are
  Codex-delegated. Operator real-account smoke closes the milestone
  (operator ceremony).

## Scoping rulings (2026-09-05, operator, this session)

- Retrieval returns a local path by default; base64 only under a cap.
- Content depth (existence / titles / first N characters / whole
  document; parse vs raw) is the caller's choice on every read tool.
- A dedicated attachment-level search tool ships alongside metadata
  enrichment of the existing search and get tools.
- Draft attachments are in scope, as file-path inputs.
- Inline images and Drive-link surfacing are caller opt-ins.
- Process: Codex builds, Fable authors plans and reviews, Opus is not
  used, smoke stays operator-run.

## Open questions (HITL)

- **Q1 — acceptance.** Does the 2026-09-01 carte-blanche grant extend to
  this session's drafts, or does the operator accept M4 and its T3s
  explicitly?

## Rulings (2026-09-05, operator acceptance via session scoping answers)

- **Q1 (acceptance)**: the operator answered every scoping question in
  this session ("as you recommend" on retrieval shape, search shape,
  draft attachments and process; caller's choice on content depth,
  inline images and Drive links) and instructed the build to proceed
  via Codex. Recorded as acceptance of `M4-gmail-attachments`,
  `T3-m4-attachment-read` and `T3-m4-draft-attachments`, mirroring the
  2026-09-01 carte-blanche precedent. Target-selection: M4 is the
  target milestone on acceptance. Reversible by the operator on
  reading this note.

## Rulings addendum (2026-09-07, operator)

The operator asked for the server to be packaged as a proper Claude Code
plugin, following the other ExFu plugins' conventions, labelled **beta**,
and listed in `exfu-marketplace`. A third T3 targets this milestone:
`T3-m4-plugin-packaging` (modular Google packages, committed esbuild
bundle, `plugins/exfu-multiaccount/` with manifest, `.mcp.json`, skill,
licence, README). Accepted on the operator's explicit instruction in that
session. Definition of done gains item 6: the plugin installs from the
marketplace and its bundled server lists all 19 tools. Marketplace
wiring (repo, pin) is orchestrator work outside the T3.
