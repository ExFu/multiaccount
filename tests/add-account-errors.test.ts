import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { authorizeGoogleAccount, getProfileEmail, loadConfig } = vi.hoisted(() => ({
  authorizeGoogleAccount: vi.fn(async () => ({ fake: "client" })),
  getProfileEmail: vi.fn(async () => {
    throw new Error(
      "Gmail API has not been used in project 123456 before or it is disabled.",
    );
  }),
  loadConfig: vi.fn(async () => ({ googleClientSecretPath: "/dev/null" })),
}));

vi.mock("../src/providers/google/auth.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/auth.js")>()),
  authorizeGoogleAccount,
}));

vi.mock("../src/providers/google/gmail.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/gmail.js")>()),
  getProfileEmail,
}));

vi.mock("../src/config.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/config.js")>()),
  loadConfig,
}));

import { accountsAdd, accountsList } from "../src/tools.js";

let home: string;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-adderr-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("accountsAdd verification failure", () => {
  it("surfaces the underlying cause instead of a generic message", async () => {
    await expect(accountsAdd("gmail")).rejects.toThrow(
      /Gmail API has not been used in project 123456/,
    );
  });

  it("does not register the account when verification fails", async () => {
    await accountsAdd("gmail").catch(() => undefined);
    expect(await accountsList()).toEqual([]);
  });
});
