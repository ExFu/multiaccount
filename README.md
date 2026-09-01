# exfu-multiaccount

`exfu-multiaccount` is a local MCP server that gives an AI assistant explicit,
read-only access to Gmail, Google Drive, and Google Calendar across more than
one Google account. Each account has a human alias; credentials remain in a
separate local token file and are never returned by a tool.

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

The server requests only the read-only Gmail, Drive, and Calendar scopes. It
cannot send, delete, or modify mail, files, or calendar events.

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

Existing accounts must re-consent before Drive and Calendar tools can use the
new scopes. Rebuild, then re-authorize all accounts or one alias at a time:

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

Every Gmail, Drive, and Calendar tool requires an `account` alias; use `"all"`
to fan out across configured accounts. Results and per-account errors are tagged
with the source alias.
