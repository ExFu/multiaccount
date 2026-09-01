import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { driveFactory, filesExport, filesGet, filesList } = vi.hoisted(() => {
  const filesExport = vi.fn();
  const filesGet = vi.fn();
  const filesList = vi.fn();
  return {
    driveFactory: vi.fn(() => ({
      files: { export: filesExport, get: filesGet, list: filesList },
    })),
    filesExport,
    filesGet,
    filesList,
  };
});

vi.mock("googleapis", () => ({
  google: { drive: driveFactory },
}));

import { readFile, searchFiles } from "../src/providers/google/drive.js";

const client = {} as never;
let home: string;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-drive-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.clearAllMocks();
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("Google Drive provider", () => {
  it("passes through Drive query syntax and maps search results", async () => {
    filesList.mockResolvedValue({
      data: {
        files: [
          {
            id: "file-1",
            name: "Quarterly plan",
            mimeType: "application/vnd.google-apps.document",
            modifiedTime: "2026-08-31T12:00:00.000Z",
            size: "1234",
            webViewLink: "https://drive.google.com/file-1",
            owners: [{ emailAddress: "owner@example.com" }],
          },
        ],
      },
    });

    await expect(searchFiles(client, "name contains 'Quarterly'", 7)).resolves.toEqual([
      {
        id: "file-1",
        name: "Quarterly plan",
        mimeType: "application/vnd.google-apps.document",
        modifiedTime: "2026-08-31T12:00:00.000Z",
        size: "1234",
        webViewLink: "https://drive.google.com/file-1",
        owner: "owner@example.com",
      },
    ]);
    expect(filesList).toHaveBeenCalledWith({
      q: "name contains 'Quarterly'",
      pageSize: 7,
      fields: "files(id,name,mimeType,modifiedTime,size,webViewLink,owners(emailAddress))",
    });
  });

  it.each([
    ["application/vnd.google-apps.document", "text/plain"],
    ["application/vnd.google-apps.spreadsheet", "text/csv"],
    ["application/vnd.google-apps.presentation", "text/plain"],
  ])("exports Google-native %s files as %s", async (mimeType, exportMimeType) => {
    filesGet.mockResolvedValue({ data: { id: "native-1", name: "Native", mimeType } });
    filesExport.mockResolvedValue({ data: Buffer.from("exported content") });

    await expect(readFile(client, "native-1")).resolves.toEqual({
      id: "native-1",
      name: "Native",
      mimeType,
      body: "exported content",
    });
    expect(filesExport).toHaveBeenCalledWith(
      { fileId: "native-1", mimeType: exportMimeType },
      { responseType: "arraybuffer" },
    );
    expect(filesGet).toHaveBeenCalledTimes(1);
  });

  it.each(["text/plain", "text/csv", "application/json"])(
    "downloads %s files as media",
    async (mimeType) => {
      filesGet
        .mockResolvedValueOnce({ data: { id: "text-1", name: "Text", mimeType } })
        .mockResolvedValueOnce({ data: Buffer.from("downloaded content") });

      await expect(readFile(client, "text-1")).resolves.toEqual({
        id: "text-1",
        name: "Text",
        mimeType,
        body: "downloaded content",
      });
      expect(filesGet).toHaveBeenNthCalledWith(2, { fileId: "text-1", alt: "media" }, {
        responseType: "arraybuffer",
      });
      expect(filesExport).not.toHaveBeenCalled();
    },
  );

  it("truncates fetched content at 262144 bytes and notes truncation", async () => {
    filesGet
      .mockResolvedValueOnce({ data: { id: "large-1", name: "Large", mimeType: "text/plain" } })
      .mockResolvedValueOnce({ data: Buffer.alloc(262_145, "x") });

    const result = await readFile(client, "large-1");

    expect(Buffer.byteLength(result.body)).toBe(262_144);
    expect(result.truncated).toBe(true);
    expect(result.note).toBe("content truncated at 262144 bytes");
  });

  it("returns metadata without fetching binary content", async () => {
    filesGet.mockResolvedValue({
      data: { id: "binary-1", name: "Archive", mimeType: "application/zip" },
    });

    await expect(readFile(client, "binary-1")).resolves.toEqual({
      id: "binary-1",
      name: "Archive",
      mimeType: "application/zip",
      body: "",
      note: "binary file; not fetched",
    });
    expect(filesGet).toHaveBeenCalledTimes(1);
    expect(filesExport).not.toHaveBeenCalled();
  });
});
