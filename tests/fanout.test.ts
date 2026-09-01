import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Account } from "../src/accounts/registry.js";

const { getAuthedClient, searchFiles, searchMessages } = vi.hoisted(() => ({
  getAuthedClient: vi.fn(async (alias: string) => ({ alias })),
  searchFiles: vi.fn(async (client: { alias: string }) => {
    if (client.alias === "broken") {
      throw new Error("simulated provider failure");
    }
    return [{ id: `${client.alias}-file`, name: "notes", mimeType: "text/plain" }];
  }),
  searchMessages: vi.fn(async (client: { alias: string }) => {
    if (client.alias === "broken") {
      throw new Error("simulated provider failure");
    }
    return [{ id: `${client.alias}-message`, snippet: "hello" }];
  }),
}));

vi.mock("../src/providers/google/auth.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/auth.js")>()),
  getAuthedClient,
}));

vi.mock("../src/providers/google/gmail.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/gmail.js")>()),
  searchMessages,
}));

vi.mock("../src/providers/google/drive.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/drive.js")>()),
  searchFiles,
}));

import { saveAccounts } from "../src/accounts/registry.js";
import { driveSearch, gmailSearch } from "../src/tools.js";

let home: string;

function account(alias: string): Account {
  return {
    alias,
    provider: "google",
    email: `${alias}@example.com`,
    scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    addedAt: "2026-09-01T00:00:00.000Z",
  };
}

beforeEach(async () => {
  vi.clearAllMocks();
  home = await mkdtemp(join(tmpdir(), "exfu-fanout-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  await saveAccounts([account("personal"), account("work"), account("broken")]);
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("gmail all-account fan-out", () => {
  it("merges and tags results while preserving a per-account error", async () => {
    const results = await gmailSearch("all", "subject:hello", 5);

    expect(results).toEqual([
      { account: "personal", id: "personal-message", snippet: "hello" },
      { account: "work", id: "work-message", snippet: "hello" },
      { account: "broken", error: 'Request failed for account "broken".' },
    ]);
    expect(getAuthedClient).toHaveBeenCalledTimes(3);
    expect(searchMessages).toHaveBeenCalledTimes(3);
  });
});

describe("Drive all-account fan-out", () => {
  it("merges and tags results while preserving a per-account error", async () => {
    const results = await driveSearch("all", "name contains 'notes'", 5);

    expect(results).toEqual([
      {
        account: "personal",
        id: "personal-file",
        name: "notes",
        mimeType: "text/plain",
      },
      { account: "work", id: "work-file", name: "notes", mimeType: "text/plain" },
      { account: "broken", error: 'Request failed for account "broken".' },
    ]);
    expect(getAuthedClient).toHaveBeenCalledTimes(3);
    expect(searchFiles).toHaveBeenCalledTimes(3);
  });
});
