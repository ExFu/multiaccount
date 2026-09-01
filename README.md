# exfu-multiaccount

`exfu-multiaccount` is a local MCP server that gives an AI assistant explicit,
read-only access to more than one Gmail account. Each account has a human alias;
credentials remain in a separate local token file and are never returned by a
tool.

## Install and build

Requirements: Node.js and npm.

```sh
npm install
npm run build
```

## Create a Google OAuth client

1. Open the Google Cloud Console and select or create a project.
2. Enable the Gmail API.
3. Configure the OAuth consent screen for your use.
4. Create an OAuth client ID with application type **Desktop app**.
5. Download the client-secret JSON file to a private local location.

The server requests only
`https://www.googleapis.com/auth/gmail.readonly`. It cannot send, delete, or
modify mail.

## Configure

By default, local state is stored in `~/.exfu-multiaccount`. Set
`EXFU_MULTIACCOUNT_HOME` to use another directory. Create `config.json` in that
directory:

```json
{
  "googleClientSecretPath": "/absolute/path/to/google-oauth-client.json"
}
```

Account metadata is stored in `accounts.json`. Each account's credentials are
stored separately as `tokens/<alias>.json` with file mode `0600`.

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

Restart Claude Code, then use `accounts_list`, `accounts_add`, `gmail_search`,
and `gmail_get_message`. Every Gmail tool requires an `account` alias; use
`"all"` to fan out across configured accounts. Results and per-account errors
are tagged with the source alias.
