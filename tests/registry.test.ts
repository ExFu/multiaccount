import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  addAccount,
  loadAccounts,
  saveAccounts,
  validateAlias,
  type Account,
} from "../src/accounts/registry.js";

let home: string;

function account(alias = "personal-mail"): Account {
  return {
    alias,
    provider: "google",
    email: `${alias}@example.com`,
    scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    extraInfo: "Personal correspondence",
    addedAt: "2026-09-01T00:00:00.000Z",
  };
}

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-registry-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("account registry", () => {
  it.each(["Work", "work_mail", "-work", "work-", "work--mail", "work mail"])(
    "rejects invalid alias %s",
    (alias) => expect(() => validateAlias(alias)).toThrow(/lowercase kebab-case/),
  );

  it.each(["work", "personal-mail", "community-2"])("accepts alias %s", (alias) => {
    expect(() => validateAlias(alias)).not.toThrow();
  });

  it("enforces unique aliases", async () => {
    await addAccount(account("work"));
    await expect(addAccount(account("work"))).rejects.toThrow(/already exists/);
  });

  it("round-trips account metadata without secrets", async () => {
    const input = {
      ...account(),
      access_token: "must-not-be-written",
      refresh_token: "must-not-be-written",
    };
    await saveAccounts([input]);
    expect(await loadAccounts()).toEqual([account()]);

    const raw = await readFile(join(home, "accounts.json"), "utf8");
    expect(raw).not.toMatch(/access_token|refresh_token|client_secret/);
    expect(JSON.parse(raw)).toEqual([account()]);
  });
});
