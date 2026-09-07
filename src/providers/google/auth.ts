import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { OAuth2Client, type Credentials } from "google-auth-library";
import open from "open";
import { updateAccountScopes } from "../../accounts/registry.js";
import { createTokenStore } from "../../accounts/storeFactory.js";
import type { StoredTokens, TokenStore } from "../../accounts/tokens.js";
import { loadConfig, type ExfuConfig } from "../../config.js";

export const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/calendar.events",
];

interface ClientDefinition {
  client_id?: string;
  client_secret?: string;
}

interface ClientSecretFile {
  installed?: ClientDefinition;
  web?: ClientDefinition;
}

async function readClientDefinition(path: string): Promise<Required<ClientDefinition>> {
  let value: ClientSecretFile;
  try {
    value = JSON.parse(await readFile(path, "utf8")) as ClientSecretFile;
  } catch {
    throw new Error(`Could not read the Google OAuth client file at ${path}.`);
  }

  const definition = value.installed ?? value.web;
  if (!definition?.client_id || !definition.client_secret) {
    throw new Error("The Google OAuth client file is missing client_id or client_secret.");
  }
  return { client_id: definition.client_id, client_secret: definition.client_secret };
}

function attachTokenPersistence(
  client: OAuth2Client,
  alias: string,
  initialTokens: StoredTokens,
  tokenStore: TokenStore,
): void {
  let currentTokens = initialTokens;
  client.on("tokens", (tokens) => {
    currentTokens = { ...currentTokens, ...tokens };
    void tokenStore.set(alias, currentTokens).catch(() => undefined);
  });
}

function credentials(tokens: StoredTokens): Credentials {
  return tokens as Credentials;
}

export async function authorizeGoogleAccount(
  alias: string,
  config?: ExfuConfig,
  tokenStore: TokenStore = createTokenStore(),
): Promise<OAuth2Client> {
  const activeConfig = config ?? (await loadConfig());
  const definition = await readClientDefinition(activeConfig.googleClientSecretPath);
  const state = randomBytes(24).toString("hex");
  const callbackPath = "/oauth2callback";
  let settleCode: ((code: string) => void) | undefined;
  let rejectCode: ((error: Error) => void) | undefined;
  const codePromise = new Promise<string>((resolve, reject) => {
    settleCode = resolve;
    rejectCode = reject;
  });

  const server = createServer((request, response) => {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
    if (requestUrl.pathname !== callbackPath) {
      response.writeHead(404).end("Not found");
      return;
    }
    if (requestUrl.searchParams.get("state") !== state) {
      response.writeHead(400).end("Invalid OAuth state. You can close this tab.");
      rejectCode?.(new Error("Google authorization returned an invalid state."));
      return;
    }
    const oauthError = requestUrl.searchParams.get("error");
    const code = requestUrl.searchParams.get("code");
    if (oauthError || !code) {
      response.writeHead(400).end("Google authorization was not completed. You can close this tab.");
      rejectCode?.(new Error("Google authorization was not completed."));
      return;
    }
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("ExFu authorization complete. You can close this tab.");
    settleCode?.(code);
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address() as AddressInfo;
  const redirectUri = `http://127.0.0.1:${address.port}${callbackPath}`;
  const client = new OAuth2Client(
    definition.client_id,
    definition.client_secret,
    redirectUri,
  );
  const authorizationUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_SCOPES,
    state,
  });

  const timeout = setTimeout(
    () => rejectCode?.(new Error("Google authorization timed out. Run add-account again.")),
    5 * 60 * 1000,
  );
  timeout.unref();

  try {
    await open(authorizationUrl);
    const code = await codePromise;
    const { tokens } = await client.getToken(code);
    if (!tokens.refresh_token) {
      throw new Error("Google did not return a refresh token. Revoke access and run add-account again.");
    }
    await tokenStore.set(alias, tokens as StoredTokens);
    await updateAccountScopes(alias, GOOGLE_SCOPES);
    client.setCredentials(tokens);
    attachTokenPersistence(client, alias, tokens as StoredTokens, tokenStore);
    return client;
  } finally {
    clearTimeout(timeout);
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

export async function getAuthedClient(
  alias: string,
  config?: ExfuConfig,
  tokenStore: TokenStore = createTokenStore(),
): Promise<OAuth2Client> {
  const activeConfig = config ?? (await loadConfig());
  const definition = await readClientDefinition(activeConfig.googleClientSecretPath);
  const tokens = await tokenStore.get(alias);
  if (!tokens) {
    throw new Error(`Account "${alias}" needs authorization. Run add-account ${alias}.`);
  }

  const client = new OAuth2Client(definition.client_id, definition.client_secret);
  client.setCredentials(credentials(tokens));
  attachTokenPersistence(client, alias, tokens, tokenStore);
  return client;
}
