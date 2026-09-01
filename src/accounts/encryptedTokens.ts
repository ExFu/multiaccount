import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { chmod, readFile, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { resolveHome } from "../config.js";
import { validateAlias } from "./registry.js";
import type { KeyProvider } from "./keyProvider.js";
import { FileTokenStore, type StoredTokens, type TokenStore } from "./tokens.js";

const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function validateTokens(value: unknown, alias: string): StoredTokens {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw decryptionError(alias);
  }
  return value as StoredTokens;
}

function decryptionError(alias: string): Error {
  return new Error(
    `Encrypted credentials for account "${alias}" could not be authenticated. ` +
      `Re-authorize with add-account ${alias}.`,
  );
}

export class EncryptedFileTokenStore implements TokenStore {
  constructor(private readonly keyProvider: KeyProvider) {}

  private async tokenPaths(alias: string): Promise<{ encrypted: string; plaintext: string }> {
    validateAlias(alias);
    const tokenDirectory = join(await resolveHome(), "tokens");
    return {
      encrypted: join(tokenDirectory, `${alias}.json.enc`),
      plaintext: join(tokenDirectory, `${alias}.json`),
    };
  }

  private async key(): Promise<Buffer> {
    const key = await this.keyProvider.getKey();
    if (key.length !== 32) {
      throw new Error("The token encryption key must be exactly 32 bytes.");
    }
    return key;
  }

  private async readEncrypted(alias: string, path: string): Promise<StoredTokens> {
    const payload = await readFile(path);
    if (payload.length < IV_LENGTH + AUTH_TAG_LENGTH) {
      throw decryptionError(alias);
    }

    const iv = payload.subarray(0, IV_LENGTH);
    const authTag = payload.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const ciphertext = payload.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
    const key = await this.key();

    try {
      const decipher = createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(authTag);
      const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
      return validateTokens(JSON.parse(plaintext.toString("utf8")) as unknown, alias);
    } catch {
      throw decryptionError(alias);
    }
  }

  async get(alias: string): Promise<StoredTokens | null> {
    const paths = await this.tokenPaths(alias);
    try {
      return await this.readEncrypted(alias, paths.encrypted);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }

    const plaintextStore = new FileTokenStore();
    const tokens = await plaintextStore.get(alias);
    if (!tokens) {
      return null;
    }

    await this.set(alias, tokens);
    await rm(paths.plaintext, { force: true });
    return this.readEncrypted(alias, paths.encrypted);
  }

  async set(alias: string, tokens: StoredTokens): Promise<void> {
    const { encrypted: path } = await this.tokenPaths(alias);
    const key = await this.key();
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const ciphertext = Buffer.concat([
      cipher.update(JSON.stringify(tokens), "utf8"),
      cipher.final(),
    ]);
    const payload = Buffer.concat([iv, cipher.getAuthTag(), ciphertext]);
    const temporaryPath = `${path}.${process.pid}.${Date.now()}.${randomBytes(6).toString("hex")}.tmp`;

    await writeFile(temporaryPath, payload, { mode: 0o600 });
    await chmod(temporaryPath, 0o600);
    await rename(temporaryPath, path);
    await chmod(path, 0o600);
  }

  async delete(alias: string): Promise<void> {
    const paths = await this.tokenPaths(alias);
    await Promise.all([
      rm(paths.encrypted, { force: true }),
      rm(paths.plaintext, { force: true }),
    ]);
  }
}
