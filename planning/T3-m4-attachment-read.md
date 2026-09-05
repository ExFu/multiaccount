---
id: T3-m4-attachment-read
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M4-gmail-attachments
status: active
---

# T3 — Gmail attachment read surface (M4 slice 1)

Principles inherited from `T2-core-server` §1 (registry routing, fan-out
on reads, core/transport split) and §6 A1–A4, A6. Rulings from
`M4-gmail-attachments`. Do not restate them in code comments.

## 1. Environment (pinned)

- Repo root (git worktree):
  `/Users/al/Studio/projects/exfu-multiaccount/.claude/worktrees/gmail-attachments-ea1d2d`, macOS.
- Node v25.9.0, npm 11.12.1, TypeScript ^5.9.3, vitest ^2.1.9,
  googleapis ^137.1.0, zod ^3.25.76. `npm run build` = tsc → `dist/`.
  Baseline: 13 test files, 67 tests, all green.
- Modules to extend, not rewrite: `src/providers/google/gmail.ts`,
  `src/tools.ts`, `src/server.ts`, `README.md`. New module:
  `src/providers/google/attachmentText.ts`.
- Tool registration pattern: `server.registerTool(name, {title,
  description, inputSchema (zod)}, handler)` returning
  `toolResult(JSON)` — mirror it exactly. Read tools fan out via
  `selectedAccounts` and return `Array<Tagged… | AccountError>` — mirror
  `gmailSearch` / `gmailGetMessage` in `src/tools.ts`.
- Existing helpers in `gmail.ts` to reuse: `gmailClient`, `headers`,
  `decodeBase64Url`, `collectParts`, `messageMetadata`. `partData`
  already fetches `users.messages.attachments.get` for text bodies —
  keep it; the new code reuses its fetch, not its utf8 decode.

## 2. Deliverable

1. **Types** in `src/providers/google/gmail.ts`:
   ```ts
   export interface GmailAttachmentMeta {
     attachmentId: string;   // part.body.attachmentId
     partId: string;         // part.partId
     filename: string;       // part.filename, "" when absent
     mimeType: string;
     size: number;           // part.body.size ?? 0
     inline: boolean;        // see rule below
     contentId?: string;     // Content-ID header, angle brackets stripped
   }
   export interface GmailDriveLink { fileId: string; url: string; kind: "file" | "document" | "spreadsheet" | "presentation" | "folder" | "unknown" }
   ```
   `GmailSearchResult` gains `attachments?: GmailAttachmentMeta[]`.
   `GmailMessage` gains `attachments: GmailAttachmentMeta[]` and
   `driveLinks?: GmailDriveLink[]`.
2. **`listAttachmentParts(payload)`** (exported, pure): walk the part
   tree; a part is an attachment when `part.body?.attachmentId` is set.
   `inline` is true when the part's `Content-Disposition` header starts
   with `inline` (case-insensitive) OR the part has a `Content-ID`
   header and `part.filename` is empty. Exclude parts whose mimeType is
   `text/plain` or `text/html` with no filename (those are bodies).
3. **`extractDriveLinks(text)`** (exported, pure, in `gmail.ts`): scan
   for URLs matching, in order:
   `drive.google.com/file/d/<id>` → `file`;
   `docs.google.com/document/d/<id>` → `document`;
   `docs.google.com/spreadsheets/d/<id>` → `spreadsheet`;
   `docs.google.com/presentation/d/<id>` → `presentation`;
   `drive.google.com/drive/folders/<id>` → `folder`;
   `drive.google.com/open?id=<id>` → `unknown`.
   `<id>` is `[A-Za-z0-9_-]+`. De-duplicate by fileId, preserve first
   occurrence order. The text scanned is the decoded body **plus** the
   raw HTML of every `text/html` part (links are often only in href).
4. **`searchMessages(client, query, maxResults, options?)`** gains
   `options: { includeAttachments?: boolean; includeInline?: boolean }`.
   When `includeAttachments` is true, fetch each message with
   `format: "full"` instead of `"metadata"`, and set `attachments` to
   `listAttachmentParts(payload)` filtered by `inline === false` unless
   `includeInline`. Otherwise behavior is byte-for-byte unchanged.
5. **`getMessage(client, id, options?)`** gains `options:
   { includeInline?: boolean; includeDriveLinks?: boolean }`. Always
   populate `attachments` (filtered by inline as above). Populate
   `driveLinks` only when `includeDriveLinks` is true.
6. **`searchAttachments(client, input)`** (new, exported) with input
   `{ query: string; maxResults: number; filenamePattern?: string;
   mimeType?: string; includeInline?: boolean; previewChars?: number }`:
   - Effective query: if `query` does not contain `has:attachment`,
     use `${query} has:attachment`.trim().
   - `users.messages.list` with `maxResults`, then `messages.get`
     `format: "full"` per message.
   - Flatten to one row per attachment part:
     `GmailAttachmentRow = GmailAttachmentMeta & { messageId, threadId?,
     subject?, from?, date? }`.
   - `filenamePattern`: case-insensitive glob where `*` matches any run
     and `?` one char, tested against `filename`; `mimeType`: exact
     match, or prefix match when it ends with `/` (e.g. `image/`).
   - `previewChars` (default 0, max 4000): when > 0, for each row whose
     MIME type is text-extractable (see §2.7) fetch the attachment
     bytes and add `preview: string` = first `previewChars` characters
     of extracted text, and `previewTruncated: boolean`. Non-extractable
     rows get `preview: null`. Extraction errors set `preview: null`
     and `previewError: string` (message only) — never throw for one
     row.
7. **`src/providers/google/attachmentText.ts`** (new):
   - `export function isTextExtractable(mimeType: string, filename: string): boolean`
     — true for `text/*`, `application/json`, `application/xml`,
     `text/csv`, `application/pdf`,
     `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
     and when mimeType is `application/octet-stream` but the filename
     ends in `.txt .md .csv .json .xml .pdf .docx`.
   - `export async function extractText(bytes: Buffer, mimeType: string, filename: string): Promise<string>`
     — text families: utf8 decode. PDF: `pdf-parse`. DOCX: `mammoth`
     (`extractRawText`). Otherwise throw
     `Error(\`Text extraction is not supported for ${mimeType}.\`)`.
   - Dependencies: add `pdf-parse@^1.1.1` and `mammoth@^1.8.0` to
     `dependencies`; add `@types/pdf-parse` to devDependencies. Import
     pdf-parse as `import pdfParse from "pdf-parse/lib/pdf-parse.js"`
     (the package index has a debug-mode side effect that reads a test
     file). If pdf-parse 1.x fails to load under Node 25, use the
     current `pdf-parse@2` API instead and record the deviation in
     your report.
8. **`getAttachment(client, input)`** (new, exported in `gmail.ts`)
   with input `{ messageId: string; attachmentId: string; mode: "text"
   | "save" | "base64"; maxChars?: number; outputDir?: string;
   filename?: string; overwrite?: boolean }`:
   - Fetch metadata: `messages.get` `format: "full"`, locate the part
     by `attachmentId` via `listAttachmentParts`; throw
     `Error("Attachment not found on message.")` if absent. Fetch bytes
     via `users.messages.attachments.get`, decode base64url to a
     `Buffer` (do **not** utf8-decode). Common result fields:
     `{ messageId, attachmentId, filename, mimeType, size: bytes.length,
     sha256 }` (hex).
   - `mode: "text"`: if not `isTextExtractable`, return
     `{ …common, mode: "text", text: null, note: "Attachment is not
     text-extractable (<mimeType>); use mode \"save\"." }`. Else
     `extractText`; apply `maxChars` (default 20000; `0` means whole
     document); return `{ …common, mode: "text", text, chars:
     <full length>, truncated: boolean }`.
   - `mode: "save"`: `outputDir` required (throw `Error("outputDir is
     required for mode \"save\".")`). Resolve to absolute; `mkdir -p`.
     Target name = `filename` param, else the part filename, else
     `attachment-${attachmentId.slice(0,12)}`; sanitize by replacing
     any char outside `[A-Za-z0-9._ -]` with `_`, stripping leading
     dots, and rejecting path separators. If the target exists and
     `overwrite` is not true, throw `Error(\`File exists: ${path}
     (pass overwrite: true).\`)`. Write bytes; return
     `{ …common, mode: "save", path }`.
   - `mode: "base64"`: cap `BASE64_LIMIT_BYTES = 1_048_576`; above it
     throw `Error(\`Attachment is ${size} bytes; inline base64 is
     capped at 1048576. Use mode "save".\`)`. Return `{ …common, mode:
     "base64", data: <standard base64> }`.
9. **`src/tools.ts`**:
   - `gmailSearch(account, query, maxResults, options?)` passes
     `options` through.
   - `gmailGetMessage(account, messageId, options?)` passes through.
   - New `gmailSearchAttachments(account, input)`: fan-out like
     `gmailSearch`, rows tagged `{ account: alias, …row }`.
   - New `gmailGetAttachment(account, input)`: fan-out like
     `gmailGetMessage` (a message id exists in exactly one account;
     `"all"` tries each and returns one success plus `AccountError`
     entries for the rest — identical to `gmailGetMessage` semantics).
     Filesystem writes in save mode happen at most once because only
     one account can own the message id.
10. **`src/server.ts`**:
    - `gmail_search` gains `includeAttachments: z.boolean().default(false)`
      and `includeInline: z.boolean().default(false)`.
    - `gmail_get_message` gains `includeInline: z.boolean().default(false)`
      and `includeDriveLinks: z.boolean().default(false)`.
    - New `gmail_search_attachments` — `{ account, query,
      maxResults (int 1..100 default 10), filenamePattern?, mimeType?,
      includeInline (default false), previewChars (int 0..4000 default
      0) }`; description: "Find attachments across one or all accounts;
      one row per attachment. previewChars > 0 adds a bounded text
      preview for PDF, DOCX and text attachments (slower)."
    - New `gmail_get_attachment` — `{ account, messageId, attachmentId,
      mode: z.enum(["text","save","base64"]), maxChars?: int ≥0,
      outputDir?, filename?, overwrite?: boolean }`; description must
      state the three modes, that text mode covers PDF/DOCX/text, the
      1 MiB base64 cap, and that save writes to a local directory on
      the machine running the server. Annotations
      `{ readOnlyHint: true }` (save mode writes only to a
      caller-chosen local path, not to Google).
11. **Tests** (mock googleapis, no network, existing style):
    - `tests/gmail-attachments.test.ts`: `listAttachmentParts` on a
      nested multipart fixture (mixed → alternative + pdf + inline
      png with Content-ID); inline filtering; `extractDriveLinks` on
      all six URL shapes with de-dup; `searchAttachments` glob and
      mimeType prefix filters and `has:attachment` injection;
      `getAttachment` text/save/base64 including not-found, base64
      cap, overwrite refusal, filename sanitization (`../evil.pdf` →
      `evil.pdf`-style safe name inside outputDir); a mock spy asserts
      `messages.send`/`drafts.send` are never called.
    - `tests/attachment-text.test.ts`: `isTextExtractable` matrix;
      `extractText` for utf8 text and a DOCX generated in-test (mammoth
      can read a minimal zip; if generating one is impractical, mock
      `mammoth`); PDF via a small fixture under `tests/fixtures/` or a
      mocked `pdf-parse` — mocking is acceptable, note which.
12. **Docs**: README.md — new subsection "Attachments" under the tool
    list describing the two new tools, the new flags, modes, caps, and
    that no re-consent is needed.

## 3. Commands (exact)

```
npm install
npm run build
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0.
2. `npm test` exits 0; the 67 baseline tests stay green.
3. Stdio smoke: pipe `initialize` (protocolVersion 2025-06-18), then
   `notifications/initialized`, then `tools/list` into
   `node dist/index.js`; the result contains exactly 19 tools: the 17
   existing plus `gmail_search_attachments` and `gmail_get_attachment`.
4. `grep -rn "drafts.send\|messages.send\|messages.delete\|messages.trash" src/` returns no matches.

## 5. Out of scope (do not touch)

- No draft attachments (that is `T3-m4-draft-attachments`); no scope
  changes; no Drive fetching from Gmail tools; no OCR of images; no
  XLSX/PPTX extraction; no HTTP transport.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
