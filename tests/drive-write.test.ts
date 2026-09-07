import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { driveFactory, filesCreate, filesGet, filesUpdate } = vi.hoisted(() => {
  const filesCreate = vi.fn();
  const filesGet = vi.fn();
  const filesUpdate = vi.fn();
  return {
    driveFactory: vi.fn(() => ({
      files: { create: filesCreate, get: filesGet, update: filesUpdate },
    })),
    filesCreate,
    filesGet,
    filesUpdate,
  };
});

vi.mock("@googleapis/drive", () => ({
  drive: driveFactory,
}));

import { createFile, updateFileContent } from "../src/providers/google/drive.js";

const client = {} as never;
let home: string;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-drive-write-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.clearAllMocks();
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("Google Drive writes", () => {
  it("creates a converted Google Doc in a folder with media content", async () => {
    filesCreate.mockResolvedValue({
      data: {
        id: "doc-1",
        name: "Notes",
        mimeType: "application/vnd.google-apps.document",
        webViewLink: "https://docs.google.com/document/d/doc-1/edit",
      },
    });

    await expect(
      createFile(client, {
        name: "Notes",
        content: "Meeting notes",
        mimeType: "text/markdown",
        folderId: "folder-1",
        asGoogleDoc: true,
      }),
    ).resolves.toEqual({
      id: "doc-1",
      name: "Notes",
      mimeType: "application/vnd.google-apps.document",
      webViewLink: "https://docs.google.com/document/d/doc-1/edit",
    });
    expect(filesCreate).toHaveBeenCalledWith({
      requestBody: {
        name: "Notes",
        parents: ["folder-1"],
        mimeType: "application/vnd.google-apps.document",
      },
      media: { mimeType: "text/markdown", body: "Meeting notes" },
      fields: "id,name,mimeType,webViewLink",
    });
  });

  it("replaces a Google Doc body through Drive conversion", async () => {
    filesGet.mockResolvedValue({
      data: {
        id: "doc-1",
        name: "Notes",
        mimeType: "application/vnd.google-apps.document",
      },
    });
    filesUpdate.mockResolvedValue({
      data: {
        id: "doc-1",
        name: "Notes",
        mimeType: "application/vnd.google-apps.document",
        modifiedTime: "2026-09-01T19:00:00.000Z",
        webViewLink: "https://docs.google.com/document/d/doc-1/edit",
      },
    });

    await expect(updateFileContent(client, "doc-1", "Replacement")).resolves.toEqual({
      id: "doc-1",
      name: "Notes",
      mimeType: "application/vnd.google-apps.document",
      modifiedTime: "2026-09-01T19:00:00.000Z",
      webViewLink: "https://docs.google.com/document/d/doc-1/edit",
    });
    expect(filesGet).toHaveBeenCalledWith({ fileId: "doc-1", fields: "id,name,mimeType" });
    expect(filesUpdate).toHaveBeenCalledWith({
      fileId: "doc-1",
      media: { mimeType: "text/plain", body: "Replacement" },
      fields: "id,name,mimeType,modifiedTime,webViewLink",
    });
  });

  it.each([
    "application/vnd.google-apps.spreadsheet",
    "application/vnd.google-apps.presentation",
  ])("rejects updates to %s files", async (mimeType) => {
    filesGet.mockResolvedValue({ data: { id: "native-1", name: "Native", mimeType } });

    await expect(updateFileContent(client, "native-1", "Replacement")).rejects.toThrow(
      "Updating Google Sheets/Slides is not supported.",
    );
    expect(filesUpdate).not.toHaveBeenCalled();
  });

  it("updates text content and honors a replacement MIME type", async () => {
    filesGet.mockResolvedValue({
      data: { id: "text-1", name: "Notes", mimeType: "text/plain" },
    });
    filesUpdate.mockResolvedValue({
      data: { id: "text-1", name: "Notes", mimeType: "text/markdown" },
    });

    await updateFileContent(client, "text-1", "# Replacement", "text/markdown");

    expect(filesUpdate).toHaveBeenCalledWith({
      fileId: "text-1",
      media: { mimeType: "text/markdown", body: "# Replacement" },
      fields: "id,name,mimeType,modifiedTime,webViewLink",
    });
  });

  it("rejects binary file updates", async () => {
    filesGet.mockResolvedValue({
      data: { id: "binary-1", name: "Archive", mimeType: "application/zip" },
    });

    await expect(updateFileContent(client, "binary-1", "Replacement")).rejects.toThrow(
      "Updating binary files is not supported.",
    );
    expect(filesUpdate).not.toHaveBeenCalled();
  });
});
