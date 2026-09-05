import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  attachmentsGet,
  draftsSend,
  extractText,
  gmailFactory,
  messagesGet,
  messagesList,
  messagesSend,
} = vi.hoisted(() => {
  const attachmentsGet = vi.fn();
  const draftsSend = vi.fn();
  const extractText = vi.fn(async (bytes: Buffer) => bytes.toString("utf8"));
  const messagesGet = vi.fn();
  const messagesList = vi.fn();
  const messagesSend = vi.fn();
  return {
    attachmentsGet,
    draftsSend,
    extractText,
    gmailFactory: vi.fn(() => ({
      users: {
        drafts: { send: draftsSend },
        messages: {
          attachments: { get: attachmentsGet },
          get: messagesGet,
          list: messagesList,
          send: messagesSend,
        },
      },
    })),
    messagesGet,
    messagesList,
    messagesSend,
  };
});

vi.mock("googleapis", () => ({
  google: { gmail: gmailFactory },
}));

vi.mock("../src/providers/google/attachmentText.js", () => ({
  extractText,
  isTextExtractable: (mimeType: string, filename: string) =>
    mimeType.startsWith("text/") ||
    mimeType === "application/pdf" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    (mimeType === "application/octet-stream" && /\.(?:txt|pdf|docx)$/i.test(filename)),
}));

import {
  extractDriveLinks,
  getAttachment,
  getMessage,
  listAttachmentParts,
  searchAttachments,
  searchMessages,
} from "../src/providers/google/gmail.js";

const client = {} as never;
let home: string;

function encoded(value: Buffer | string): string {
  return Buffer.from(value).toString("base64url");
}

function nestedPayload() {
  return {
    mimeType: "multipart/mixed",
    parts: [
      {
        mimeType: "multipart/alternative",
        partId: "0",
        parts: [
          {
            mimeType: "text/plain",
            partId: "0.0",
            filename: "",
            body: { attachmentId: "body-text", size: 12 },
          },
          {
            mimeType: "text/html",
            partId: "0.1",
            filename: "",
            body: { data: encoded('<a href="https://drive.google.com/file/d/html-only">x</a>') },
          },
        ],
      },
      {
        mimeType: "application/pdf",
        partId: "1",
        filename: "Quarterly Report.PDF",
        headers: [{ name: "Content-Disposition", value: "attachment" }],
        body: { attachmentId: "pdf-1", size: 321 },
      },
      {
        mimeType: "image/png",
        partId: "2",
        filename: "",
        headers: [{ name: "Content-ID", value: "<inline-image>" }],
        body: { attachmentId: "image-1", size: 123 },
      },
      {
        mimeType: "image/jpeg",
        partId: "3",
        filename: "signature.jpg",
        headers: [{ name: "Content-Disposition", value: "Inline; filename=signature.jpg" }],
        body: { attachmentId: "image-2", size: 99 },
      },
    ],
  };
}

function messageWithAttachment(
  mimeType = "text/plain",
  filename = "notes.txt",
  attachmentId = "attachment-1",
) {
  return {
    data: {
      id: "message-1",
      threadId: "thread-1",
      snippet: "attachment",
      payload: {
        mimeType: "multipart/mixed",
        headers: [
          { name: "Subject", value: "Attachments" },
          { name: "From", value: "sender@example.com" },
          { name: "Date", value: "Sat, 5 Sep 2026 12:00:00 +0000" },
        ],
        parts: [
          {
            mimeType,
            partId: "1",
            filename,
            body: { attachmentId, size: 20 },
          },
        ],
      },
    },
  };
}

beforeEach(async () => {
  vi.clearAllMocks();
  home = await mkdtemp(join(tmpdir(), "exfu-gmail-attachments-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
});

afterEach(async () => {
  expect(messagesSend).not.toHaveBeenCalled();
  expect(draftsSend).not.toHaveBeenCalled();
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("Gmail attachment metadata", () => {
  it("walks nested multiparts, excludes body parts, and identifies inline parts", () => {
    expect(listAttachmentParts(nestedPayload())).toEqual([
      {
        attachmentId: "pdf-1",
        partId: "1",
        filename: "Quarterly Report.PDF",
        mimeType: "application/pdf",
        size: 321,
        inline: false,
      },
      {
        attachmentId: "image-1",
        partId: "2",
        filename: "",
        mimeType: "image/png",
        size: 123,
        inline: true,
        contentId: "inline-image",
      },
      {
        attachmentId: "image-2",
        partId: "3",
        filename: "signature.jpg",
        mimeType: "image/jpeg",
        size: 99,
        inline: true,
      },
    ]);
  });

  it("filters inline attachments by default and can include them", async () => {
    messagesGet.mockResolvedValue({
      data: { id: "message-1", labelIds: [], snippet: "", payload: nestedPayload() },
    });
    attachmentsGet.mockResolvedValue({ data: { data: encoded("Body") } });

    await expect(getMessage(client, "message-1")).resolves.toMatchObject({
      attachments: [{ attachmentId: "pdf-1" }],
    });
    await expect(
      getMessage(client, "message-1", { includeInline: true }),
    ).resolves.toMatchObject({
      attachments: [
        { attachmentId: "pdf-1" },
        { attachmentId: "image-1" },
        { attachmentId: "image-2" },
      ],
    });
  });

  it("uses full format only when search attachment metadata is requested", async () => {
    messagesList.mockResolvedValue({ data: { messages: [{ id: "message-1" }] } });
    messagesGet.mockResolvedValue({
      data: { id: "message-1", snippet: "", payload: nestedPayload() },
    });

    await expect(searchMessages(client, "newer_than:1d", 3)).resolves.toEqual([
      { id: "message-1", snippet: "" },
    ]);
    expect(messagesGet).toHaveBeenLastCalledWith({
      userId: "me",
      id: "message-1",
      format: "metadata",
      metadataHeaders: ["From", "To", "Subject", "Date"],
    });

    await expect(
      searchMessages(client, "newer_than:1d", 3, { includeAttachments: true }),
    ).resolves.toEqual([
      {
        id: "message-1",
        snippet: "",
        attachments: [expect.objectContaining({ attachmentId: "pdf-1" })],
      },
    ]);
    expect(messagesGet).toHaveBeenLastCalledWith({
      userId: "me",
      id: "message-1",
      format: "full",
    });
  });

  it("finds Drive links that appear only in raw HTML", async () => {
    messagesGet.mockResolvedValue({
      data: { id: "message-1", labelIds: [], snippet: "", payload: nestedPayload() },
    });
    attachmentsGet.mockResolvedValue({ data: { data: encoded("Body") } });

    await expect(
      getMessage(client, "message-1", { includeDriveLinks: true }),
    ).resolves.toMatchObject({
      driveLinks: [
        {
          fileId: "html-only",
          url: "https://drive.google.com/file/d/html-only",
          kind: "file",
        },
      ],
    });
  });
});

describe("Google Drive link extraction", () => {
  it("recognizes all supported URL shapes and de-duplicates by file id", () => {
    const text = [
      "https://docs.google.com/document/d/doc_1/edit",
      "https://drive.google.com/file/d/file-1/view",
      "https://docs.google.com/spreadsheets/d/sheet_1/edit",
      "https://docs.google.com/presentation/d/slides-1/edit",
      "https://drive.google.com/drive/folders/folder_1",
      "https://drive.google.com/open?id=unknown-1",
      "https://drive.google.com/file/d/doc_1/view",
    ].join(" ");

    expect(extractDriveLinks(text)).toEqual([
      {
        fileId: "doc_1",
        url: "https://docs.google.com/document/d/doc_1",
        kind: "document",
      },
      {
        fileId: "file-1",
        url: "https://drive.google.com/file/d/file-1",
        kind: "file",
      },
      {
        fileId: "sheet_1",
        url: "https://docs.google.com/spreadsheets/d/sheet_1",
        kind: "spreadsheet",
      },
      {
        fileId: "slides-1",
        url: "https://docs.google.com/presentation/d/slides-1",
        kind: "presentation",
      },
      {
        fileId: "folder_1",
        url: "https://drive.google.com/drive/folders/folder_1",
        kind: "folder",
      },
      {
        fileId: "unknown-1",
        url: "https://drive.google.com/open?id=unknown-1",
        kind: "unknown",
      },
    ]);
  });
});

describe("attachment search", () => {
  it("injects has:attachment and applies glob and exact MIME filters", async () => {
    messagesList.mockResolvedValue({ data: { messages: [{ id: "message-1" }] } });
    messagesGet.mockResolvedValue({
      data: { ...messageWithAttachment().data, payload: nestedPayload() },
    });

    await expect(
      searchAttachments(client, {
        query: "from:sender@example.com",
        maxResults: 5,
        filenamePattern: "quarterly*.pdf",
        mimeType: "application/pdf",
      }),
    ).resolves.toEqual([
      expect.objectContaining({
        messageId: "message-1",
        attachmentId: "pdf-1",
        filename: "Quarterly Report.PDF",
      }),
    ]);
    expect(messagesList).toHaveBeenCalledWith({
      userId: "me",
      q: "from:sender@example.com has:attachment",
      maxResults: 5,
    });
  });

  it("keeps an existing attachment query and applies MIME prefix filtering", async () => {
    messagesList.mockResolvedValue({ data: { messages: [{ id: "message-1" }] } });
    messagesGet.mockResolvedValue({
      data: { ...messageWithAttachment().data, payload: nestedPayload() },
    });

    const rows = await searchAttachments(client, {
      query: "has:attachment newer_than:7d",
      maxResults: 10,
      mimeType: "image/",
      includeInline: true,
    });

    expect(rows.map(({ attachmentId }) => attachmentId)).toEqual(["image-1", "image-2"]);
    expect(messagesList).toHaveBeenCalledWith({
      userId: "me",
      q: "has:attachment newer_than:7d",
      maxResults: 10,
    });
  });
});

describe("attachment retrieval", () => {
  it("extracts bounded text", async () => {
    messagesGet.mockResolvedValue(messageWithAttachment());
    attachmentsGet.mockResolvedValue({ data: { data: encoded("hello world") } });

    await expect(
      getAttachment(client, {
        messageId: "message-1",
        attachmentId: "attachment-1",
        mode: "text",
        maxChars: 5,
      }),
    ).resolves.toMatchObject({
      messageId: "message-1",
      attachmentId: "attachment-1",
      filename: "notes.txt",
      mimeType: "text/plain",
      size: 11,
      mode: "text",
      text: "hello",
      chars: 11,
      truncated: true,
      sha256: expect.stringMatching(/^[a-f0-9]{64}$/),
    });
  });

  it("returns an honest note for non-extractable content", async () => {
    messagesGet.mockResolvedValue(messageWithAttachment("image/png", "photo.png"));
    attachmentsGet.mockResolvedValue({ data: { data: encoded("png") } });

    await expect(
      getAttachment(client, {
        messageId: "message-1",
        attachmentId: "attachment-1",
        mode: "text",
      }),
    ).resolves.toMatchObject({
      mode: "text",
      text: null,
      note: 'Attachment is not text-extractable (image/png); use mode "save".',
    });
  });

  it("saves a sanitized filename inside outputDir and refuses overwrite", async () => {
    messagesGet.mockResolvedValue(messageWithAttachment("application/pdf", "report.pdf"));
    attachmentsGet.mockResolvedValue({ data: { data: encoded("pdf bytes") } });
    const outputDir = join(home, "downloads");
    const input = {
      messageId: "message-1",
      attachmentId: "attachment-1",
      mode: "save" as const,
      outputDir,
      filename: "../evil.pdf",
    };

    await expect(getAttachment(client, input)).resolves.toMatchObject({
      mode: "save",
      path: join(outputDir, "evil.pdf"),
    });
    await expect(readFile(join(outputDir, "evil.pdf"), "utf8")).resolves.toBe("pdf bytes");
    await expect(getAttachment(client, input)).rejects.toThrow(
      `File exists: ${join(outputDir, "evil.pdf")} (pass overwrite: true).`,
    );
  });

  it("returns standard base64 below the cap", async () => {
    messagesGet.mockResolvedValue(messageWithAttachment());
    attachmentsGet.mockResolvedValue({ data: { data: encoded("bytes") } });

    await expect(
      getAttachment(client, {
        messageId: "message-1",
        attachmentId: "attachment-1",
        mode: "base64",
      }),
    ).resolves.toMatchObject({ mode: "base64", data: Buffer.from("bytes").toString("base64") });
  });

  it("rejects base64 above the 1 MiB cap", async () => {
    const bytes = Buffer.alloc(1_048_577);
    messagesGet.mockResolvedValue(messageWithAttachment());
    attachmentsGet.mockResolvedValue({ data: { data: encoded(bytes) } });

    await expect(
      getAttachment(client, {
        messageId: "message-1",
        attachmentId: "attachment-1",
        mode: "base64",
      }),
    ).rejects.toThrow(
      'Attachment is 1048577 bytes; inline base64 is capped at 1048576. Use mode "save".',
    );
  });

  it("does not fetch bytes when the attachment is absent", async () => {
    messagesGet.mockResolvedValue({ data: { id: "message-1", payload: nestedPayload() } });

    await expect(
      getAttachment(client, {
        messageId: "message-1",
        attachmentId: "missing",
        mode: "base64",
      }),
    ).rejects.toThrow("Attachment not found on message.");
    expect(attachmentsGet).not.toHaveBeenCalled();
  });
});
