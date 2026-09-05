---
id: T3-m4-draft-attachments
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M4-gmail-attachments
status: active
---

# T3 — attachments on Gmail drafts (M4 slice 2)

Principles inherited from `T2-core-server` §5 W1–W4 and §6 A5–A6.
Rulings from `M4-gmail-attachments`. Do not restate them in code
comments. Builds on top of `T3-m4-attachment-read` (assume it has
landed; do not re-do its work).

## 1. Environment (pinned)

- Repo root (git worktree):
  `/Users/al/Studio/projects/exfu-multiaccount/.claude/worktrees/gmail-attachments-ea1d2d`, macOS.
- Node v25.9.0, npm 11.12.1. `npm run build` = tsc → `dist/`. Run
  `npm test` first and record the baseline count; all must be green.
- Modules to extend: `src/providers/google/gmail.ts` (`createDraft`,
  `GmailDraftInput`, `GmailDraft`), `src/server.ts`
  (`gmail_create_draft`), `README.md`. `src/tools.ts` needs no change
  beyond passing the wider input through.
- The existing draft builder assembles RFC 2822 headers + a
  `text/plain; charset=UTF-8` body and base64url-encodes it as `raw`.
  Keep its header logic (RFC 2047 encoding, reply threading) intact.

## 2. Deliverable

1. **Types**: `GmailDraftInput` gains
   `attachments?: Array<{ path: string; filename?: string; mimeType?: string }>`.
   `GmailDraft` gains `attachments: Array<{ filename: string; mimeType:
   string; size: number }>` (empty array when none).
2. **Limits** (exported constants in `gmail.ts`):
   `DRAFT_ATTACHMENT_TOTAL_LIMIT_BYTES = 20 * 1024 * 1024` (20 MiB —
   below Gmail's 25 MB message limit, leaving room for base64
   overhead) and `DRAFT_ATTACHMENT_MAX_COUNT = 20`.
3. **`createDraft` changes**:
   - Before any network call, read every attachment with
     `fs.promises.readFile(resolve(path))`. A missing/unreadable file
     throws `Error(\`Attachment not readable: ${path}\`)` (never the
     raw ENOENT text). Reject more than `DRAFT_ATTACHMENT_MAX_COUNT`
     and reject when the sum of byte lengths exceeds the total limit,
     with messages naming the limit.
   - Filename = `filename` param, else `basename(path)`. MIME type =
     `mimeType` param, else by extension from a small internal map
     (`pdf, png, jpg/jpeg, gif, webp, txt, md, csv, json, xml, html,
     zip, docx, xlsx, pptx, doc, xls, ppt, mp3, mp4, ics`), else
     `application/octet-stream`.
   - When `attachments` is empty or absent, the produced `raw` must be
     **byte-identical** to today's output (existing tests must pass
     unchanged).
   - When attachments exist, build `multipart/mixed` with a boundary
     `=_exfu_${random 24 hex}` and this layout:
     ```
     <existing headers…>
     MIME-Version: 1.0
     Content-Type: multipart/mixed; boundary="<b>"

     --<b>
     Content-Type: text/plain; charset=UTF-8
     Content-Transfer-Encoding: 8bit

     <body>
     --<b>
     Content-Type: <mime>; name="<filename>"
     Content-Disposition: attachment; filename="<filename>"
     Content-Transfer-Encoding: base64

     <base64 of bytes, wrapped at 76 chars, CRLF>
     --<b>--
     ```
     Filenames with non-ASCII or `"` are RFC 2047 encoded in `name=`
     and `filename=` using the existing `encodeHeaderValue`.
     Lines are joined with `\r\n` throughout.
   - `users.drafts.create` call and the returned receipt fields are
     unchanged apart from the added `attachments` array.
   - **Never** call `users.messages.send` or `users.drafts.send`
     (binding: T2 §5 W2).
4. **`src/server.ts`**: `gmail_create_draft` gains
   `attachments: z.array(z.object({ path: z.string().min(1),
   filename: z.string().optional(), mimeType: z.string().optional() }))
   .optional()` described as "Local file paths on the machine running
   the server; total ≤ 20 MiB, ≤ 20 files." Pass through to
   `gmailCreateDraft`.
5. **Tests**: extend `tests/gmail-draft.test.ts` (or add
   `tests/gmail-draft-attachments.test.ts`): write temp files under a
   `mkdtemp` dir; decode `raw`; assert multipart structure, boundary
   reuse, body part first, each attachment's headers, base64 payload
   round-trips to the original bytes, 76-char wrapping, extension →
   MIME mapping, explicit `mimeType`/`filename` overrides, non-ASCII
   filename encoding, missing-file error text, count and total-size
   rejection (use a stubbed `readFile` or a sparse file for the size
   case), and that no-attachment output is unchanged. Send spies stay
   asserted never-called.
6. **Docs**: README.md — extend the Write tools / draft section with
   the `attachments` input and limits.

## 3. Commands (exact)

```
npm run build
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0.
2. `npm test` exits 0; every baseline test stays green.
3. Stdio `tools/list` smoke (same recipe as `T3-m4-attachment-read`
   §4.3) still returns exactly 19 tools; `gmail_create_draft`'s input
   schema now lists `attachments`.
4. `grep -rn "drafts.send\|messages.send" src/` returns no matches.

## 5. Out of scope (do not touch)

- No send tool; no Drive-file-as-attachment (path inputs only); no
  inline/`cid:` images in drafts; no HTML bodies.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
