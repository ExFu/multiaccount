import {
  addAccount,
  getAccount,
  loadAccounts,
  removeAccount,
  validateAlias,
  type Account,
} from "./accounts/registry.js";
import { FileTokenStore } from "./accounts/tokens.js";
import { loadConfig } from "./config.js";
import {
  authorizeGoogleAccount,
  getAuthedClient,
  GOOGLE_SCOPES,
} from "./providers/google/auth.js";
import {
  listEvents,
  type CalendarEvent,
  type CalendarEventOptions,
} from "./providers/google/calendar.js";
import {
  readFile,
  searchFiles,
  type DriveFile,
  type DriveSearchResult,
} from "./providers/google/drive.js";
import {
  getMessage,
  getProfileEmail,
  searchMessages,
  type GmailMessage,
  type GmailSearchResult,
} from "./providers/google/gmail.js";

export interface AccountError {
  account: string;
  error: string;
}

export type TaggedSearchResult = GmailSearchResult & { account: string };
export type TaggedMessage = GmailMessage & { account: string };
export type TaggedDriveSearchResult = DriveSearchResult & { account: string };
export type TaggedDriveFile = DriveFile & { account: string };
export type TaggedCalendarEvent = CalendarEvent & { account: string };

export interface CalendarEventsOptions {
  timeMin?: string;
  timeMax?: string;
  query?: string;
  maxResults?: number;
}

export async function accountsList(): Promise<Account[]> {
  return loadAccounts();
}

export async function accountsAdd(alias: string, extraInfo?: string): Promise<Account> {
  validateAlias(alias);
  if ((await loadAccounts()).some((account) => account.alias === alias)) {
    throw new Error(`Account alias "${alias}" already exists.`);
  }

  const config = await loadConfig();
  const tokenStore = new FileTokenStore();
  const client = await authorizeGoogleAccount(alias, config, tokenStore);
  try {
    const email = await getProfileEmail(client);
    return await addAccount({
      alias,
      provider: "google",
      email,
      scopes: [...GOOGLE_SCOPES],
      ...(extraInfo?.trim() ? { extraInfo: extraInfo.trim() } : {}),
      addedAt: new Date().toISOString(),
    });
  } catch (error) {
    await tokenStore.delete(alias);
    if (error instanceof Error && error.message.startsWith("Google did not return")) {
      throw error;
    }
    const cause = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Could not verify the authorized Google account: ${cause} ` +
        `(stored tokens for "${alias}" were removed; fix the cause and run add-account again)`,
    );
  }
}

export async function accountsRemove(alias: string): Promise<boolean> {
  validateAlias(alias);
  const removed = await removeAccount(alias);
  await new FileTokenStore().delete(alias);
  return removed;
}

function safeAccountError(error: unknown, alias: string): AccountError {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  const needsAuthorization =
    message.includes("authorization") ||
    message.includes("reauth") ||
    message.includes("invalid_grant") ||
    message.includes("unauthorized") ||
    message.includes("credentials");
  return {
    account: alias,
    error: needsAuthorization
      ? `Account "${alias}" needs re-authorization. Run add-account ${alias}.`
      : `Request failed for account "${alias}".`,
  };
}

async function selectedAccounts(account: string): Promise<Account[]> {
  if (account === "all") {
    return loadAccounts();
  }
  return [await getAccount(account)];
}

export async function gmailSearch(
  account: string,
  query: string,
  maxResults = 10,
): Promise<Array<TaggedSearchResult | AccountError>> {
  const accounts = await selectedAccounts(account);
  const results = await Promise.all(
    accounts.map(async ({ alias }) => {
      try {
        const client = await getAuthedClient(alias);
        const messages = await searchMessages(client, query, maxResults);
        return messages.map((message): TaggedSearchResult => ({ account: alias, ...message }));
      } catch (error) {
        return [safeAccountError(error, alias)];
      }
    }),
  );
  return results.flat();
}

export async function gmailGetMessage(
  account: string,
  messageId: string,
): Promise<Array<TaggedMessage | AccountError>> {
  const accounts = await selectedAccounts(account);
  return Promise.all(
    accounts.map(async ({ alias }) => {
      try {
        const client = await getAuthedClient(alias);
        const message = await getMessage(client, messageId);
        return { account: alias, ...message } as TaggedMessage;
      } catch (error) {
        return safeAccountError(error, alias);
      }
    }),
  );
}

export async function driveSearch(
  account: string,
  query: string,
  maxResults = 10,
): Promise<Array<TaggedDriveSearchResult | AccountError>> {
  const accounts = await selectedAccounts(account);
  const results = await Promise.all(
    accounts.map(async ({ alias }) => {
      try {
        const client = await getAuthedClient(alias);
        const files = await searchFiles(client, query, maxResults);
        return files.map((file): TaggedDriveSearchResult => ({ account: alias, ...file }));
      } catch (error) {
        return [safeAccountError(error, alias)];
      }
    }),
  );
  return results.flat();
}

export async function driveReadFile(
  account: string,
  fileId: string,
): Promise<Array<TaggedDriveFile | AccountError>> {
  const accounts = await selectedAccounts(account);
  return Promise.all(
    accounts.map(async ({ alias }) => {
      try {
        const client = await getAuthedClient(alias);
        const file = await readFile(client, fileId);
        return { account: alias, ...file } as TaggedDriveFile;
      } catch (error) {
        return safeAccountError(error, alias);
      }
    }),
  );
}

export async function calendarEvents(
  account: string,
  options: CalendarEventsOptions = {},
): Promise<Array<TaggedCalendarEvent | AccountError>> {
  const accounts = await selectedAccounts(account);
  const eventOptions: CalendarEventOptions = {
    ...options,
    maxResults: options.maxResults ?? 25,
  };
  const results = await Promise.all(
    accounts.map(async ({ alias }) => {
      try {
        const client = await getAuthedClient(alias);
        const events = await listEvents(client, eventOptions);
        return events.map((event): TaggedCalendarEvent => ({ account: alias, ...event }));
      } catch (error) {
        return [safeAccountError(error, alias)];
      }
    }),
  );
  return results.flat();
}
