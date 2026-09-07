import { mkdtemp, open, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  draftsCreate,
  draftsSend,
  gmailFactory,
  messagesGet,
  messagesSend,
} = vi.hoisted(() => {
  const draftsCreate = vi.fn();
  const draftsSend = vi.fn();
  const messagesGet = vi.fn();
  const messagesSend = vi.fn();
  return {
    draftsCreate,
    draftsSend,
    gmailFactory: vi.fn(() => ({
      users: {
        drafts: { create: draftsCreate, send: draftsSend },
        messages: { get: messagesGet, send: messagesSend },
      },
    })),
    messagesGet,
    messagesSend,
  };
});

vi.mock("@googleapis/gmail", () => ({
  gmail: gmailFactory,
}));

import {
  createDraft,
  DRAFT_ATTACHMENT_MAX_COUNT,
  DRAFT_ATTACHMENT_TOTAL_LIMIT_BYTES,
} from "../src/providers/google/gmail.js";

const client = {} as never;
let home: string;

function createdRequest(
  callIndex = 0,
): { requestBody: { message: { raw: string; threadId?: string } } } {
  return draftsCreate.mock.calls[callIndex]?.[0] as {
    requestBody: { message: { raw: string; threadId?: string } };
  };
}

function decodedRaw(callIndex = 0): string {
  return Buffer.from(createdRequest(callIndex).requestBody.message.raw, "base64url").toString(
    "utf8",
  );
}

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-gmail-draft-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.clearAllMocks();
});

afterEach(async () => {
  expect(messagesSend).not.toHaveBeenCalled();
  expect(draftsSend).not.toHaveBeenCalled();
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("Gmail drafts", () => {
  it("encodes RFC 2822 headers and a plain-text body", async () => {
    draftsCreate.mockResolvedValue({
      data: { id: "draft-1", message: { id: "message-1", threadId: "thread-1" } },
    });

    await expect(
      createDraft(client, {
        to: ["one@example.com", "two@example.com"],
        cc: ["copy@example.com"],
        bcc: ["hidden@example.com"],
        subject: "Status update",
        body: "First line\nSecond line",
      }),
    ).resolves.toEqual({
      draftId: "draft-1",
      messageId: "message-1",
      threadId: "thread-1",
      to: ["one@example.com", "two@example.com"],
      subject: "Status update",
      attachments: [],
    });
    expect(draftsCreate).toHaveBeenCalledWith({
      userId: "me",
      requestBody: { message: { raw: expect.any(String) } },
    });
    const raw = decodedRaw();
    expect(raw).toBe(
      "To: one@example.com, two@example.com\r\n" +
        "Cc: copy@example.com\r\n" +
        "Bcc: hidden@example.com\r\n" +
        "Subject: Status update\r\n" +
        "MIME-Version: 1.0\r\n" +
        "Content-Type: text/plain; charset=UTF-8\r\n" +
        "\r\n" +
        "First line\nSecond line",
    );
  });

  it("RFC 2047-encodes a non-ASCII subject and round-trips it", async () => {
    draftsCreate.mockResolvedValue({
      data: { id: "draft-3", message: { id: "message-3" } },
    });

    const subject = "MCP multiaccount smoke test — whaleybear → gmail";
    await expect(
      createDraft(client, { to: ["one@example.com"], subject, body: "Body" }),
    ).resolves.toMatchObject({ subject });

    const raw = decodedRaw();
    const subjectLine = raw
      .split("\r\n")
      .find((line) => line.startsWith("Subject: "));
    expect(subjectLine).toBeDefined();
    expect(subjectLine).toMatch(/^Subject: =\?UTF-8\?B\?[A-Za-z0-9+/=]+\?=$/);
    // eslint-disable-next-line no-control-regex
    expect(subjectLine).toMatch(/^[\x00-\x7f]*$/);
    const encoded = /^Subject: =\?UTF-8\?B\?([A-Za-z0-9+/=]+)\?=$/.exec(subjectLine ?? "")?.[1];
    expect(Buffer.from(encoded ?? "", "base64").toString("utf8")).toBe(subject);
  });

  it("RFC 2047-encodes non-ASCII display names in recipient headers", async () => {
    draftsCreate.mockResolvedValue({
      data: { id: "draft-4", message: { id: "message-4" } },
    });

    await expect(
      createDraft(client, {
        to: ["Zoë Brontë <zoe@example.com>"],
        cc: ["plain@example.com"],
        subject: "Plain subject",
        body: "Body",
      }),
    ).resolves.toMatchObject({ subject: "Plain subject" });

    const raw = decodedRaw();
    const [headerBlock] = raw.split("\r\n\r\n");
    // eslint-disable-next-line no-control-regex
    expect(headerBlock).toMatch(/^[\x00-\x7f]*$/);
    const toLine = raw.split("\r\n").find((line) => line.startsWith("To: "));
    expect(toLine).toBe(
      `To: =?UTF-8?B?${Buffer.from("Zoë Brontë", "utf8").toString("base64")}?= <zoe@example.com>`,
    );
    expect(raw).toContain("Cc: plain@example.com\r\n");
    expect(raw).toContain("Subject: Plain subject\r\n");
  });

  it("builds a threaded reply with derived recipient and subject", async () => {
    messagesGet.mockResolvedValue({
      data: {
        id: "original-1",
        threadId: "thread-9",
        payload: {
          headers: [
            { name: "Message-ID", value: "<original@example.com>" },
            { name: "Subject", value: "Question" },
            { name: "From", value: "sender@example.com" },
            { name: "To", value: "me@example.com" },
            { name: "Reply-To", value: "reply@example.com" },
          ],
        },
      },
    });
    draftsCreate.mockResolvedValue({
      data: { id: "draft-2", message: { id: "message-2", threadId: "thread-9" } },
    });

    await expect(
      createDraft(client, { body: "My answer", replyToMessageId: "original-1" }),
    ).resolves.toEqual({
      draftId: "draft-2",
      messageId: "message-2",
      threadId: "thread-9",
      to: ["reply@example.com"],
      subject: "Re: Question",
      attachments: [],
    });
    expect(messagesGet).toHaveBeenCalledWith({
      userId: "me",
      id: "original-1",
      format: "metadata",
      metadataHeaders: ["Message-ID", "Subject", "From", "To", "Reply-To"],
    });
    expect(createdRequest().requestBody.message.threadId).toBe("thread-9");
    const raw = decodedRaw();
    expect(raw).toContain("To: reply@example.com\r\n");
    expect(raw).toContain("Subject: Re: Question\r\n");
    expect(raw).toContain("In-Reply-To: <original@example.com>\r\n");
    expect(raw).toContain("References: <original@example.com>\r\n");
    expect(raw.endsWith("\r\n\r\nMy answer")).toBe(true);
  });

  it("keeps an explicitly empty attachment list byte-identical to no attachment input", async () => {
    draftsCreate.mockResolvedValue({
      data: { id: "draft-empty", message: { id: "message-empty" } },
    });
    const input = {
      to: ["one@example.com"],
      subject: "No attachments",
      body: "Unchanged body",
    };

    await createDraft(client, input);
    await createDraft(client, { ...input, attachments: [] });

    expect(createdRequest(1).requestBody.message.raw).toBe(
      createdRequest(0).requestBody.message.raw,
    );
  });

  it("builds multipart drafts with wrapped, round-trippable attachment payloads", async () => {
    draftsCreate.mockResolvedValue({
      data: { id: "draft-files", message: { id: "message-files" } },
    });
    const pngBytes = Buffer.from(Array.from({ length: 128 }, (_, index) => index));
    const customBytes = Buffer.from("custom attachment", "utf8");
    const unicodeBytes = Buffer.from("résumé", "utf8");
    const pngPath = join(home, "photo.PNG");
    const customPath = join(home, "source.bin");
    const unicodePath = join(home, "source.pdf");
    await Promise.all([
      writeFile(pngPath, pngBytes),
      writeFile(customPath, customBytes),
      writeFile(unicodePath, unicodeBytes),
    ]);
    const unicodeFilename = 'résumé "final".pdf';

    await expect(
      createDraft(client, {
        to: ["one@example.com"],
        subject: "Files",
        body: "Body part first",
        attachments: [
          { path: pngPath },
          {
            path: customPath,
            filename: "renamed.data",
            mimeType: "application/x-example",
          },
          { path: unicodePath, filename: unicodeFilename },
        ],
      }),
    ).resolves.toEqual({
      draftId: "draft-files",
      messageId: "message-files",
      to: ["one@example.com"],
      subject: "Files",
      attachments: [
        { filename: "photo.PNG", mimeType: "image/png", size: pngBytes.length },
        {
          filename: "renamed.data",
          mimeType: "application/x-example",
          size: customBytes.length,
        },
        { filename: unicodeFilename, mimeType: "application/pdf", size: unicodeBytes.length },
      ],
    });

    const raw = decodedRaw();
    const boundary = /Content-Type: multipart\/mixed; boundary="(=_exfu_[0-9a-f]{24})"/.exec(
      raw,
    )?.[1];
    expect(boundary).toBeDefined();
    const parts = raw.split(`--${boundary}`);
    expect(parts).toHaveLength(6);
    expect(parts[0]).toContain("MIME-Version: 1.0\r\n");
    expect(parts[0]).toContain(
      `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`,
    );
    expect(parts[1]).toBe(
      "\r\nContent-Type: text/plain; charset=UTF-8\r\n" +
        "Content-Transfer-Encoding: 8bit\r\n" +
        "\r\n" +
        "Body part first\r\n",
    );
    expect(parts[5]).toBe("--");

    const encodedUnicodeFilename = `=?UTF-8?B?${Buffer.from(unicodeFilename, "utf8").toString("base64")}?=`;
    const expectedParts = [
      { filename: "photo.PNG", headerFilename: "photo.PNG", mimeType: "image/png", bytes: pngBytes },
      {
        filename: "renamed.data",
        headerFilename: "renamed.data",
        mimeType: "application/x-example",
        bytes: customBytes,
      },
      {
        filename: unicodeFilename,
        headerFilename: encodedUnicodeFilename,
        mimeType: "application/pdf",
        bytes: unicodeBytes,
      },
    ];
    expectedParts.forEach(({ headerFilename, mimeType, bytes }, index) => {
      const part = parts[index + 2] ?? "";
      expect(part).toContain(`\r\nContent-Type: ${mimeType}; name="${headerFilename}"\r\n`);
      expect(part).toContain(
        `Content-Disposition: attachment; filename="${headerFilename}"\r\n`,
      );
      expect(part).toContain("Content-Transfer-Encoding: base64\r\n\r\n");
      const payload = part.split("\r\n\r\n")[1]?.replace(/\r\n$/, "") ?? "";
      const lines = payload.split("\r\n");
      expect(lines.every((line) => line.length <= 76)).toBe(true);
      expect(lines.slice(0, -1).every((line) => line.length === 76)).toBe(true);
      expect(Buffer.from(lines.join(""), "base64")).toEqual(bytes);
    });
  });

  it("normalizes missing attachment errors before creating a Gmail client", async () => {
    const path = join(home, "missing.pdf");

    await expect(
      createDraft(client, {
        to: ["one@example.com"],
        subject: "Missing",
        body: "Body",
        attachments: [{ path }],
      }),
    ).rejects.toThrow(`Attachment not readable: ${path}`);
    expect(gmailFactory).not.toHaveBeenCalled();
    expect(draftsCreate).not.toHaveBeenCalled();
  });

  it("rejects more than the attachment count limit before any network call", async () => {
    await expect(
      createDraft(client, {
        to: ["one@example.com"],
        subject: "Too many",
        body: "Body",
        attachments: Array.from({ length: DRAFT_ATTACHMENT_MAX_COUNT + 1 }, (_, index) => ({
          path: join(home, `unused-${index}.txt`),
        })),
      }),
    ).rejects.toThrow(`Draft attachments are limited to ${DRAFT_ATTACHMENT_MAX_COUNT} files.`);
    expect(gmailFactory).not.toHaveBeenCalled();
    expect(draftsCreate).not.toHaveBeenCalled();
  });

  it("rejects attachment bytes over the total limit before any network call", async () => {
    const path = join(home, "oversized.bin");
    const file = await open(path, "w");
    try {
      await file.truncate(DRAFT_ATTACHMENT_TOTAL_LIMIT_BYTES + 1);
    } finally {
      await file.close();
    }

    await expect(
      createDraft(client, {
        to: ["one@example.com"],
        subject: "Too large",
        body: "Body",
        attachments: [{ path }],
      }),
    ).rejects.toThrow(
      `Draft attachments exceed the ${DRAFT_ATTACHMENT_TOTAL_LIMIT_BYTES} byte (20 MiB) total limit.`,
    );
    expect(gmailFactory).not.toHaveBeenCalled();
    expect(draftsCreate).not.toHaveBeenCalled();
  });
});
