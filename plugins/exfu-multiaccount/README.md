# ExFu Multiaccount

ExFu Multiaccount is a local MCP server for Gmail, Google Drive, Google Docs,
and Google Calendar across several Google accounts. Every account has an
explicit alias so Claude can act on the right account and search all accounts
when requested. OAuth tokens stay on your machine.

## Beta — devs only

This plugin is **beta, for developers only**. It is not an install-and-go
connector yet:

- You must create your own Google Cloud OAuth desktop client and point a
  config file at it (see Setup). The plugin never ships a shared client ID.
- Account authorization opens a browser and listens on a localhost port, so
  run it from Claude Code on your own machine. Sandboxed environments such as
  Claude Cowork are untested and are not expected to complete authorization.
- The tool surface may change between beta releases, and it has only had an
  operator-run real-account smoke test.

Report issues at https://github.com/ExFu/multiaccount/issues.

## Requirements

- Node.js 20 or newer.
- Your own Google Cloud OAuth client with application type **Desktop app**.

Enable the Gmail, Google Drive, Google Docs, and Google Calendar APIs in the
OAuth client's Google Cloud project.

## Setup

Local state defaults to `~/.exfu-multiaccount/`. Set
`EXFU_MULTIACCOUNT_HOME` to override it. Create `config.json` in that directory:

```json
{
  "googleClientSecretPath": "/absolute/path/to/google-oauth-client.json"
}
```

Add each account under a lowercase kebab-case alias:

```sh
node "$CLAUDE_PLUGIN_ROOT/server/cli.mjs" add-account <alias> --info "What this account is for"
```

Find the plugin root using the installed-plugin path Claude Code reports. From
a source checkout, run the same bundled CLI at
`plugins/exfu-multiaccount/server/cli.mjs`. Authorization opens a browser.

Installation provides an MCP server named `exfu-multiaccount`. Remove any
hand-configured MCP entry with the same name to avoid a duplicate server.

## Tools

Account setup:

- `accounts_list` lists configured account metadata.
- `accounts_add` authorizes and registers an account alias.

Read:

- `gmail_search` searches Gmail and can include attachment metadata.
- `gmail_get_message` reads a message and can include inline parts and Drive links.
- `drive_search` searches Drive.
- `drive_read_file` reads supported Drive and Google-native files.
- `calendar_events` lists events from the primary calendar.

Attachments:

- `gmail_search_attachments` returns one row per attachment; use
  `previewChars` for a bounded PDF, DOCX, or text preview.
- `gmail_get_attachment` retrieves one attachment in `text`, `save`, or
  `base64` mode. Base64 is capped at 1 MiB; save refuses overwrite by default.

Write:

- `drive_create_file` and `drive_update_file` create or replace Drive content.
- `docs_append_text` and `docs_replace_text` edit Google Docs.
- `calendar_create_event` and `calendar_update_event` write events without
  emailing attendees.
- `gmail_create_draft` creates a draft, optionally with local attachments, and
  never sends it.

Delete:

- `drive_trash_file` moves a Drive file to recoverable trash.
- `calendar_delete_event` deletes an event without emailing attendees.
- `gmail_delete_draft` deletes only a draft, never a Gmail message.

Read and attachment tools accept one account alias or `"all"`. Fan-out results
and errors are tagged with their source alias. Every write or delete tool
requires exactly one alias, rejects `"all"`, and returns a receipt containing
the acting alias and account email.

## License

Proprietary — see [LICENSE](LICENSE).
