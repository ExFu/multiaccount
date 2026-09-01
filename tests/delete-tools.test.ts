import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Account } from "../src/accounts/registry.js";

const {
  calendarFactory,
  draftsDelete,
  draftsSend,
  driveFactory,
  eventsDelete,
  filesDelete,
  filesUpdate,
  getAuthedClient,
  gmailFactory,
  messagesDelete,
  messagesSend,
  messagesTrash,
} = vi.hoisted(() => {
  const draftsDelete = vi.fn();
  const draftsSend = vi.fn();
  const eventsDelete = vi.fn();
  const filesDelete = vi.fn();
  const filesUpdate = vi.fn();
  const messagesDelete = vi.fn();
  const messagesSend = vi.fn();
  const messagesTrash = vi.fn();
  return {
    calendarFactory: vi.fn(() => ({ events: { delete: eventsDelete } })),
    draftsDelete,
    draftsSend,
    driveFactory: vi.fn(() => ({ files: { delete: filesDelete, update: filesUpdate } })),
    eventsDelete,
    filesDelete,
    filesUpdate,
    getAuthedClient: vi.fn(async (alias: string) => ({ alias })),
    gmailFactory: vi.fn(() => ({
      users: {
        drafts: { delete: draftsDelete, send: draftsSend },
        messages: { delete: messagesDelete, send: messagesSend, trash: messagesTrash },
      },
    })),
    messagesDelete,
    messagesSend,
    messagesTrash,
  };
});

vi.mock("googleapis", () => ({
  google: { calendar: calendarFactory, drive: driveFactory, gmail: gmailFactory },
}));

vi.mock("../src/providers/google/auth.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/providers/google/auth.js")>()),
  getAuthedClient,
}));

import { saveAccounts } from "../src/accounts/registry.js";
import { deleteEvent } from "../src/providers/google/calendar.js";
import { trashFile } from "../src/providers/google/drive.js";
import { deleteDraft } from "../src/providers/google/gmail.js";
import {
  calendarDeleteEvent,
  driveTrashFile,
  gmailDeleteDraft,
} from "../src/tools.js";

const client = {} as never;
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
  home = await mkdtemp(join(tmpdir(), "exfu-delete-tools-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.clearAllMocks();
  await saveAccounts([account("work")]);
});

afterEach(async () => {
  expect(filesDelete).not.toHaveBeenCalled();
  expect(messagesDelete).not.toHaveBeenCalled();
  expect(messagesTrash).not.toHaveBeenCalled();
  expect(messagesSend).not.toHaveBeenCalled();
  expect(draftsSend).not.toHaveBeenCalled();
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("narrow delete providers", () => {
  it("moves a Drive file to trash without permanently deleting it", async () => {
    filesUpdate.mockResolvedValue({
      data: { id: "file-1", name: "Notes", mimeType: "text/plain", trashed: true },
    });

    await expect(trashFile(client, "file-1")).resolves.toEqual({
      id: "file-1",
      name: "Notes",
      mimeType: "text/plain",
      trashed: true,
    });
    expect(filesUpdate).toHaveBeenCalledWith({
      fileId: "file-1",
      requestBody: { trashed: true },
      fields: "id,name,mimeType,trashed",
    });
  });

  it("deletes a primary-calendar event without attendee updates", async () => {
    eventsDelete.mockResolvedValue({ data: {} });

    await expect(deleteEvent(client, "event-1")).resolves.toEqual({
      eventId: "event-1",
      deleted: true,
    });
    expect(eventsDelete).toHaveBeenCalledWith({
      calendarId: "primary",
      eventId: "event-1",
      sendUpdates: "none",
    });
  });

  it("deletes only the requested Gmail draft", async () => {
    draftsDelete.mockResolvedValue({ data: {} });

    await expect(deleteDraft(client, "draft-1")).resolves.toEqual({
      draftId: "draft-1",
      deleted: true,
    });
    expect(draftsDelete).toHaveBeenCalledWith({ userId: "me", id: "draft-1" });
  });
});

describe("delete tool account routing", () => {
  it.each([
    ["driveTrashFile", () => driveTrashFile("all", "file-1")],
    ["calendarDeleteEvent", () => calendarDeleteEvent("all", "event-1")],
    ["gmailDeleteDraft", () => gmailDeleteDraft("all", "draft-1")],
  ])("rejects all-account fan-out for %s", async (_name, invoke) => {
    await expect(invoke()).rejects.toThrow(
      'Write tools require one explicit account alias; "all" is not permitted.',
    );
    expect(getAuthedClient).not.toHaveBeenCalled();
  });

  it("tags successful delete receipts with alias and registry email", async () => {
    filesUpdate.mockResolvedValue({
      data: { id: "file-1", name: "Notes", mimeType: "text/plain", trashed: true },
    });
    eventsDelete.mockResolvedValue({ data: {} });
    draftsDelete.mockResolvedValue({ data: {} });

    await expect(driveTrashFile("work", "file-1")).resolves.toEqual({
      account: "work",
      accountEmail: "work@example.com",
      id: "file-1",
      name: "Notes",
      mimeType: "text/plain",
      trashed: true,
    });
    await expect(calendarDeleteEvent("work", "event-1")).resolves.toEqual({
      account: "work",
      accountEmail: "work@example.com",
      eventId: "event-1",
      deleted: true,
    });
    await expect(gmailDeleteDraft("work", "draft-1")).resolves.toEqual({
      account: "work",
      accountEmail: "work@example.com",
      draftId: "draft-1",
      deleted: true,
    });
  });
});
