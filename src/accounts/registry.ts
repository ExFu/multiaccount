import { readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { resolveHome } from "../config.js";

export const ALIAS_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface Account {
  alias: string;
  provider: "google";
  email: string;
  scopes: string[];
  extraInfo?: string;
  addedAt: string;
}

export function validateAlias(alias: string): void {
  if (!ALIAS_PATTERN.test(alias)) {
    throw new Error(
      `Invalid account alias "${alias}". Use lowercase kebab-case (for example, work or personal-mail).`,
    );
  }
}

function metadataOnlyAccount(account: Account): Account {
  if (typeof account !== "object" || account === null) {
    throw new Error("Invalid account registry entry.");
  }
  validateAlias(account.alias);
  if (account.provider !== "google") {
    throw new Error(`Unsupported provider for account "${account.alias}".`);
  }
  if (
    typeof account.email !== "string" ||
    !account.email ||
    !Array.isArray(account.scopes) ||
    account.scopes.some((scope) => typeof scope !== "string") ||
    typeof account.addedAt !== "string" ||
    !account.addedAt ||
    (account.extraInfo !== undefined && typeof account.extraInfo !== "string")
  ) {
    throw new Error(`Invalid registry entry for account "${account.alias}".`);
  }
  return {
    alias: account.alias,
    provider: account.provider,
    email: account.email,
    scopes: [...account.scopes],
    ...(account.extraInfo !== undefined ? { extraInfo: account.extraInfo } : {}),
    addedAt: account.addedAt,
  };
}

export async function loadAccounts(): Promise<Account[]> {
  const home = await resolveHome();
  try {
    const value: unknown = JSON.parse(await readFile(join(home, "accounts.json"), "utf8"));
    if (!Array.isArray(value)) {
      throw new Error("Account registry must contain an array.");
    }

    const accounts = (value as Account[]).map(metadataOnlyAccount);
    const aliases = new Set<string>();
    for (const account of accounts) {
      if (aliases.has(account.alias)) {
        throw new Error(`Duplicate account alias "${account.alias}" in registry.`);
      }
      aliases.add(account.alias);
    }
    return accounts;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    if (error instanceof SyntaxError) {
      throw new Error("Account registry contains invalid JSON.");
    }
    throw error;
  }
}

export async function saveAccounts(accounts: Account[]): Promise<void> {
  const aliases = new Set<string>();
  const metadata = accounts.map(metadataOnlyAccount);
  for (const account of metadata) {
    if (aliases.has(account.alias)) {
      throw new Error(`Account alias "${account.alias}" already exists.`);
    }
    aliases.add(account.alias);
  }

  const home = await resolveHome();
  const registryPath = join(home, "accounts.json");
  const temporaryPath = join(home, `.accounts-${process.pid}-${Date.now()}.tmp`);
  await writeFile(temporaryPath, `${JSON.stringify(metadata, null, 2)}\n`, { mode: 0o600 });
  await rename(temporaryPath, registryPath);
}

export async function addAccount(account: Account): Promise<Account> {
  const accounts = await loadAccounts();
  validateAlias(account.alias);
  if (accounts.some((candidate) => candidate.alias === account.alias)) {
    throw new Error(`Account alias "${account.alias}" already exists.`);
  }
  await saveAccounts([...accounts, account]);
  return account;
}

export async function updateAccountScopes(alias: string, scopes: string[]): Promise<void> {
  validateAlias(alias);
  const accounts = await loadAccounts();
  if (!accounts.some((account) => account.alias === alias)) {
    return;
  }
  await saveAccounts(
    accounts.map((account) =>
      account.alias === alias ? { ...account, scopes: [...scopes] } : account,
    ),
  );
}

export async function removeAccount(alias: string): Promise<boolean> {
  validateAlias(alias);
  const accounts = await loadAccounts();
  const remaining = accounts.filter((account) => account.alias !== alias);
  if (remaining.length === accounts.length) {
    return false;
  }
  await saveAccounts(remaining);
  return true;
}

export async function getAccount(alias: string): Promise<Account> {
  validateAlias(alias);
  const account = (await loadAccounts()).find((candidate) => candidate.alias === alias);
  if (!account) {
    throw new Error(`Unknown account alias "${alias}".`);
  }
  return account;
}
