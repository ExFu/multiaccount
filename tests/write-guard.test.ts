import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Account } from "../src/accounts/registry.js";

const {
  createDraft,
  createEvent,
  createFile,
  getAuthedClient,
  updateEvent,
  updateFileContent,
} = vi.hoisted(() => ({
  createDraft: vi.fn(),
  createEvent: vi.fn(),
  createFile: vi.fn(),
  getAuthedClient: vi.fn(async (alias: string) => ({ alias })),
  updateEvent: vi.fn(),
  updateFileContent: vi.fn(),
}));

vi.mock("../src/providers/google/auth.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/auth.js")>()),
  getAuthedClient,
}));

vi.mock("../src/providers/google/drive.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/drive.js")>()),
  createFile,
  updateFileContent,
}));

vi.mock("../src/providers/google/calendar.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/calendar.js")>()),
  createEvent,
  updateEvent,
}));

vi.mock("../src/providers/google/gmail.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/gmail.js")>()),
  createDraft,
}));

import { saveAccounts } from "../src/accounts/registry.js";
import {
  calendarCreateEvent,
  calendarUpdateEvent,
  driveCreateFile,
  driveUpdateFile,
  gmailCreateDraft,
} from "../src/tools.js";

let home: string;

function account(alias: string): Account {
  return {
    alias,
    provider: "google",
    email: `${alias}@example.com`,
    scopes: ["https://www.googleapis.com/auth/drive"],
    addedAt: "2026-09-01T00:00:00.000Z",
  };
}

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-write-guard-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.clearAllMocks();
  await saveAccounts([account("work")]);
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("write account guard", () => {
  it.each([
    ["driveCreateFile", () => driveCreateFile("all", { name: "x", content: "x" })],
    ["driveUpdateFile", () => driveUpdateFile("all", "file-1", "x")],
    [
      "calendarCreateEvent",
      () => calendarCreateEvent("all", { summary: "x", start: "2026-09-01", end: "2026-09-02" }),
    ],
    ["calendarUpdateEvent", () => calendarUpdateEvent("all", "event-1", { summary: "x" })],
    ["gmailCreateDraft", () => gmailCreateDraft("all", { to: ["x@example.com"], subject: "x", body: "x" })],
  ])("rejects all-account fan-out for %s", async (_name, invoke) => {
    await expect(invoke()).rejects.toThrow(
      'Write tools require one explicit account alias; "all" is not permitted.',
    );
  });

  it("tags a successful write receipt with alias and registry email", async () => {
    createFile.mockResolvedValue({
      id: "file-1",
      name: "Notes",
      mimeType: "text/plain",
      webViewLink: "https://drive.google.com/file-1",
    });

    await expect(
      driveCreateFile("work", { name: "Notes", content: "Hello" }),
    ).resolves.toEqual({
      account: "work",
      accountEmail: "work@example.com",
      id: "file-1",
      name: "Notes",
      mimeType: "text/plain",
      webViewLink: "https://drive.google.com/file-1",
    });
  });
});
