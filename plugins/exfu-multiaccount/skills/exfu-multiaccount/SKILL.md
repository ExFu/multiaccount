---
name: exfu-multiaccount
description: Use ExFu Multiaccount for multi-account Google, Gmail, Drive, Docs, or Calendar questions; choosing which account; searching all inboxes; reading or saving attachments; creating drafts; and first-run requests such as "set up exfu-multiaccount" or "add a Google account".
---

# ExFu Multiaccount

Use account aliases deliberately. Ask which alias to use when the user has not
made it clear. Read tools accept one alias or `"all"`; use `"all"` only when
the user wants a cross-account search or lookup. Fan-out results and errors are
tagged with the source alias.

## Choose attachment depth

- Metadata: use `gmail_search` with attachment metadata when the user only
  needs to know whether messages have attachments.
- Preview: use `gmail_search_attachments` with `previewChars` for a bounded
  scan of PDF, DOCX, and text attachments while searching.
- Text: use `gmail_get_attachment` in `text` mode when full readable content is
  needed; set a character limit when a bounded answer is enough.
- Save: use `gmail_get_attachment` in `save` mode for binary files or when the
  user wants a local copy. Confirm the destination and do not overwrite unless
  the user requests it.
- Base64: use `gmail_get_attachment` in `base64` mode only when another tool
  needs inline bytes; it is limited to 1 MiB.

## Write safety

Every write or delete tool requires one explicit account alias and rejects
`"all"`. Confirm the alias and intended change before acting. A successful
write returns a receipt with the acting alias and account email; surface that
receipt to the user. `gmail_create_draft` only saves drafts and never sends
mail. Deletion is limited to recoverable Drive trash, Calendar events without
attendee email, and Gmail drafts; Gmail messages cannot be deleted.

## Tool guide

- Accounts: `accounts_list`, `accounts_add`.
- Read: `gmail_search`, `gmail_get_message`, `drive_search`,
  `drive_read_file`, `calendar_events`.
- Attachments: `gmail_search_attachments`, `gmail_get_attachment`.
- Write: `drive_create_file`, `drive_update_file`, `docs_append_text`,
  `docs_replace_text`, `calendar_create_event`, `calendar_update_event`,
  `gmail_create_draft`.
- Delete: `drive_trash_file`, `calendar_delete_event`, `gmail_delete_draft`.

## First-run setup

1. Require Node.js 20 or newer and the user's own Google Cloud OAuth desktop
   client with the Gmail, Drive, Docs, and Calendar APIs enabled.
2. Create `~/.exfu-multiaccount/config.json`, or set
   `EXFU_MULTIACCOUNT_HOME` and create it there:

   ```json
   {
     "googleClientSecretPath": "/absolute/path/to/google-oauth-client.json"
   }
   ```

3. Add each lowercase kebab-case alias with `accounts_add`, including a short
   description of what the account is for. For terminal setup, run
   `node "$CLAUDE_PLUGIN_ROOT/server/cli.mjs" add-account <alias> --info "..."`.
4. If a tool says an account needs re-authorization, run the same add-account
   command for that alias and complete consent again.

## Troubleshooting

- Account not found: run `accounts_list`, check the alias, then use
  `accounts_add` if it is missing.
- Authorization or re-authorization required: add the same alias again and
  finish the browser flow.
- OAuth client file error: check `googleClientSecretPath` is absolute and
  points to the downloaded desktop-client JSON.
- Duplicate server: remove any hand-configured MCP server named
  `exfu-multiaccount`; the plugin already provides it.
- Attachment text unavailable: use `save` mode for unsupported binary formats.
