import { mkdtemp, rm } from "node:fs/promises";
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

vi.mock("googleapis", () => ({
  google: { gmail: gmailFactory },
}));

import { createDraft } from "../src/providers/google/gmail.js";

const client = {} as never;
let home: string;

function createdRequest(): { requestBody: { message: { raw: string; threadId?: string } } } {
  return draftsCreate.mock.calls[0]?.[0] as {
    requestBody: { message: { raw: string; threadId?: string } };
  };
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
    });
    expect(draftsCreate).toHaveBeenCalledWith({
      userId: "me",
      requestBody: { message: { raw: expect.any(String) } },
    });
    const raw = Buffer.from(createdRequest().requestBody.message.raw, "base64url").toString("utf8");
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
    });
    expect(messagesGet).toHaveBeenCalledWith({
      userId: "me",
      id: "original-1",
      format: "metadata",
      metadataHeaders: ["Message-ID", "Subject", "From", "To", "Reply-To"],
    });
    expect(createdRequest().requestBody.message.threadId).toBe("thread-9");
    const raw = Buffer.from(createdRequest().requestBody.message.raw, "base64url").toString("utf8");
    expect(raw).toContain("To: reply@example.com\r\n");
    expect(raw).toContain("Subject: Re: Question\r\n");
    expect(raw).toContain("In-Reply-To: <original@example.com>\r\n");
    expect(raw).toContain("References: <original@example.com>\r\n");
    expect(raw.endsWith("\r\n\r\nMy answer")).toBe(true);
  });
});
