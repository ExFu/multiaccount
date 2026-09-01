import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { EncryptedFileTokenStore } from "../src/accounts/encryptedTokens.js";
import type { KeyProvider } from "../src/accounts/keyProvider.js";
import { createTokenStore } from "../src/accounts/storeFactory.js";
import { FileTokenStore } from "../src/accounts/tokens.js";

class FixedKeyProvider implements KeyProvider {
  async getKey(): Promise<Buffer> {
    return Buffer.alloc(32, 0x5a);
  }
}

let home: string;
let store: EncryptedFileTokenStore;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-encrypted-tokens-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  delete process.env.EXFU_MULTIACCOUNT_PLAIN_TOKENS;
  store = new EncryptedFileTokenStore(new FixedKeyProvider());
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  delete process.env.EXFU_MULTIACCOUNT_PLAIN_TOKENS;
  await rm(home, { recursive: true, force: true });
});

describe("EncryptedFileTokenStore", () => {
  it("encrypts credentials with mode 0600 and decrypts them", async () => {
    const tokens = { access_token: "access-secret", refresh_token: "refresh-secret" };
    await store.set("work", tokens);

    const path = join(home, "tokens", "work.json.enc");
    expect(await store.get("work")).toEqual(tokens);
    expect((await stat(path)).mode & 0o777).toBe(0o600);
    expect((await readFile(path)).includes(Buffer.from("access-secret"))).toBe(false);
  });

  it("migrates a plaintext token file and removes the original", async () => {
    const tokens = { access_token: "legacy-access", refresh_token: "legacy-refresh" };
    await new FileTokenStore().set("personal", tokens);

    await expect(store.get("personal")).resolves.toEqual(tokens);
    await expect(stat(join(home, "tokens", "personal.json"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    expect((await stat(join(home, "tokens", "personal.json.enc"))).isFile()).toBe(true);
  });

  it("detects tampering and advises re-authorization", async () => {
    await store.set("community", { access_token: "secret" });
    const path = join(home, "tokens", "community.json.enc");
    const payload = await readFile(path);
    payload[payload.length - 1] ^= 0xff;
    await writeFile(path, payload);

    await expect(store.get("community")).rejects.toThrow(
      'Encrypted credentials for account "community" could not be authenticated. Re-authorize with add-account community.',
    );
  });
});

describe("createTokenStore", () => {
  it("honors EXFU_MULTIACCOUNT_PLAIN_TOKENS=1", () => {
    process.env.EXFU_MULTIACCOUNT_PLAIN_TOKENS = "1";
    expect(createTokenStore()).toBeInstanceOf(FileTokenStore);
  });
});
