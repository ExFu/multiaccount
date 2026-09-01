import { chmod, readFile, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { resolveHome } from "../config.js";
import { validateAlias } from "./registry.js";

export type StoredTokens = Record<string, unknown>;

export interface TokenStore {
  get(alias: string): Promise<StoredTokens | null>;
  set(alias: string, tokens: StoredTokens): Promise<void>;
  delete(alias: string): Promise<void>;
}

export class FileTokenStore implements TokenStore {
  private async tokenPath(alias: string): Promise<string> {
    validateAlias(alias);
    return join(await resolveHome(), "tokens", `${alias}.json`);
  }

  async get(alias: string): Promise<StoredTokens | null> {
    const path = await this.tokenPath(alias);
    try {
      const value: unknown = JSON.parse(await readFile(path, "utf8"));
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw new Error(`Stored credentials for account "${alias}" are invalid.`);
      }
      return value as StoredTokens;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return null;
      }
      if (error instanceof SyntaxError) {
        throw new Error(`Stored credentials for account "${alias}" are invalid.`);
      }
      throw error;
    }
  }

  async set(alias: string, tokens: StoredTokens): Promise<void> {
    const path = await this.tokenPath(alias);
    const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(tokens, null, 2)}\n`, { mode: 0o600 });
    await chmod(temporaryPath, 0o600);
    await rename(temporaryPath, path);
    await chmod(path, 0o600);
  }

  async delete(alias: string): Promise<void> {
    await rm(await this.tokenPath(alias), { force: true });
  }
}
