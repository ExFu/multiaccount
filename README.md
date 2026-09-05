# exfu-multiaccount

`exfu-multiaccount` is a local MCP server that gives an AI assistant explicit,
account-routed access to Gmail, Google Drive, and Google Calendar across more
than one Google account. Each account has a human alias; credentials remain in
a separate local token file and are never returned by a tool.

## Install and build

Requirements: Node.js and npm.

```sh
npm install
npm run build
```

## Create a Google OAuth client

1. Open the Google Cloud Console and select or create a project.
2. Enable the Gmail, Google Drive, and Google Calendar APIs.
3. Configure the OAuth consent screen for your use.
4. Create an OAuth client ID with application type **Desktop app**.
5. Download the client-secret JSON file to a private local location.

The server requests exactly these Google OAuth scopes:

- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.compose`
- `https://www.googleapis.com/auth/drive`
- `https://www.googleapis.com/auth/calendar.events`

Gmail writes only create or delete drafts; the server has no email-send or
message-delete tool. Calendar writes suppress attendee emails. Drive deletion
moves files to the recoverable trash rather than permanently deleting them.

## Configure

By default, local state is stored in `~/.exfu-multiaccount`. Set
`EXFU_MULTIACCOUNT_HOME` to use another directory. Create `config.json` in that
directory:

```json
{
  "googleClientSecretPath": "/absolute/path/to/google-oauth-client.json"
}
```

Account metadata is stored in `accounts.json`.

## Token security

On macOS, each account's credentials are encrypted at
`tokens/<alias>.json.enc` with file mode `0600`. The AES-256-GCM encryption key
is stored in macOS Keychain under service `exfu-multiaccount` and account
`token-key`; the key is never written to disk. Existing plaintext token files
are encrypted and removed when first read.

On non-macOS platforms, credentials use `tokens/<alias>.json` with mode `0600`.
Set `EXFU_MULTIACCOUNT_PLAIN_TOKENS=1` to use that plaintext store on macOS as
an explicit compatibility escape hatch.

## Add and manage accounts

Add each Gmail account under a lowercase kebab-case alias. A browser opens for
Google authorization and redirects to an ephemeral loopback listener on
`127.0.0.1`.

```sh
node dist/cli.js add-account personal --info "Personal mail and household receipts"
node dist/cli.js add-account work --info "Employer account"
node dist/cli.js list-accounts
node dist/cli.js remove-account work
```

Removing an account deletes its registry entry and local token file. It does
not revoke the OAuth grant at Google.

Every existing account must re-consent before the write tools can use the new
scope set. Rebuild, then re-authorize all accounts with
`node scripts/reauth.mjs`, or re-authorize one alias at a time:

```sh
npm run build
node scripts/reauth.mjs
node scripts/reauth.mjs personal
```

## Claude Code MCP configuration

After building, add this server to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "exfu-multiaccount": {
      "command": "node",
      "args": [
        "/Users/al/Studio/projects/exfu-multiaccount/dist/index.js"
      ]
    }
  }
}
```

Restart Claude Code, then use these tools:

- `accounts_list` and `accounts_add` manage account metadata and authorization.
- `gmail_search` and `gmail_get_message` search and read Gmail.
- `drive_search` searches Drive using Google Drive query syntax.
- `drive_read_file` reads text files and exports Docs, Sheets, and Slides to
  text formats; binary files are not downloaded.
- `calendar_events` lists events from the account's primary calendar.

Read tools accept an `account` alias or `"all"` to fan out across configured
accounts. Results and per-account errors are tagged with the source alias.

### Attachments

`gmail_search_attachments` finds attachments in one or all accounts and
returns one row per attachment. It supports case-insensitive filename globs,
MIME-type filters, optional inline attachments, and bounded text previews for
PDF, DOCX, and text attachments. `gmail_search` can also include attachment
metadata with `includeAttachments`; inline parts require `includeInline`.

`gmail_get_attachment` retrieves one attachment in `text`, `save`, or `base64`
mode. Text mode extracts PDF, DOCX, and text content and supports a character
limit. Save mode writes bytes to a caller-chosen local directory on the machine
running the server and refuses to overwrite by default. Base64 mode is capped
at 1 MiB. `gmail_get_message` can include inline parts with `includeInline` and
surface Google Drive file links with `includeDriveLinks`; Drive content is not
fetched. These features use the existing Gmail read scope, so no re-consent is
needed.

## Write tools

- `drive_create_file` creates a Drive file and can convert uploaded text into a
  Google Doc.
- `drive_update_file` replaces the content of a Google Doc or text file; Sheets,
  Slides, and binary files are rejected.
- `docs_append_text` appends text to the end of a Google Doc.
- `docs_replace_text` replaces matching text in a Google Doc, with
  case-sensitive matching by default.
- `calendar_create_event` creates an event without emailing attendees.
- `calendar_update_event` updates an event without emailing attendees.
- `gmail_create_draft` saves a new or threaded-reply draft and never sends it.
- `drive_trash_file` moves a file to Drive trash, where it remains recoverable.
- `calendar_delete_event` deletes an event without emailing attendees.
- `gmail_delete_draft` deletes only a Gmail draft, never a message.

Every write tool requires one explicit `account` alias. `"all"` is rejected,
and each successful result includes the acting alias and account email.
The Docs edit tools act only on Google Docs and require no additional consent
beyond the scope set used by the other write tools.
