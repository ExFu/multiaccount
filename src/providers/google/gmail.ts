import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { google, type Auth, type gmail_v1 } from "googleapis";
import { extractText, isTextExtractable } from "./attachmentText.js";

const BASE64_LIMIT_BYTES = 1_048_576;

export interface GmailAttachmentMeta {
  attachmentId: string;
  partId: string;
  filename: string;
  mimeType: string;
  size: number;
  inline: boolean;
  contentId?: string;
}

export interface GmailDriveLink {
  fileId: string;
  url: string;
  kind: "file" | "document" | "spreadsheet" | "presentation" | "folder" | "unknown";
}

export interface GmailSearchResult {
  id: string;
  threadId?: string;
  snippet: string;
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
  attachments?: GmailAttachmentMeta[];
}

export interface GmailMessage extends GmailSearchResult {
  labelIds: string[];
  body: string;
  attachments: GmailAttachmentMeta[];
  driveLinks?: GmailDriveLink[];
}

export interface GmailAttachmentRow extends GmailAttachmentMeta {
  messageId: string;
  threadId?: string;
  subject?: string;
  from?: string;
  date?: string;
  preview?: string | null;
  previewTruncated?: boolean;
  previewError?: string;
}

export interface GmailSearchOptions {
  includeAttachments?: boolean;
  includeInline?: boolean;
}

export interface GmailMessageOptions {
  includeInline?: boolean;
  includeDriveLinks?: boolean;
}

export interface GmailAttachmentSearchInput {
  query: string;
  maxResults: number;
  filenamePattern?: string;
  mimeType?: string;
  includeInline?: boolean;
  previewChars?: number;
}

export interface GmailAttachmentInput {
  messageId: string;
  attachmentId: string;
  mode: "text" | "save" | "base64";
  maxChars?: number;
  outputDir?: string;
  filename?: string;
  overwrite?: boolean;
}

export interface GmailDraftInput {
  to?: string[];
  cc?: string[];
  bcc?: string[];
  subject?: string;
  body: string;
  replyToMessageId?: string;
}

export interface GmailDraft {
  draftId: string;
  messageId: string;
  threadId?: string;
  to: string[];
  subject: string;
}

export interface DeletedGmailDraft {
  draftId: string;
  deleted: true;
}

function gmailClient(client: Auth.OAuth2Client): gmail_v1.Gmail {
  return google.gmail({ version: "v1", auth: client });
}

function headers(payload?: gmail_v1.Schema$MessagePart): Record<string, string> {
  return Object.fromEntries(
    (payload?.headers ?? []).map((header) => [header.name?.toLowerCase() ?? "", header.value ?? ""]),
  );
}

function decodeBase64Url(data?: string | null): string {
  return decodeBase64UrlBytes(data).toString("utf8");
}

function decodeBase64UrlBytes(data?: string | null): Buffer {
  if (!data) {
    return Buffer.alloc(0);
  }
  return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function decodeHtmlEntities(value: string): string {
  const entities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return entities[entity.toLowerCase()] ?? match;
  });
}

function htmlToText(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<\s*br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|tr|h[1-6])\s*>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\r/g, "")
      .replace(/\n{3,}/g, "\n\n"),
  ).trim();
}

async function partData(
  gmail: gmail_v1.Gmail,
  messageId: string,
  part: gmail_v1.Schema$MessagePart,
): Promise<string> {
  if (part.body?.data) {
    return decodeBase64Url(part.body.data);
  }
  if (part.body?.attachmentId) {
    const response = await gmail.users.messages.attachments.get({
      userId: "me",
      messageId,
      id: part.body.attachmentId,
    });
    return decodeBase64Url(response.data.data);
  }
  return "";
}

function collectParts(
  part: gmail_v1.Schema$MessagePart | undefined,
  mimeType: string,
): gmail_v1.Schema$MessagePart[] {
  if (!part) {
    return [];
  }
  const found = part.mimeType?.toLowerCase() === mimeType ? [part] : [];
  return [...found, ...(part.parts ?? []).flatMap((child) => collectParts(child, mimeType))];
}

export function listAttachmentParts(
  payload?: gmail_v1.Schema$MessagePart,
): GmailAttachmentMeta[] {
  if (!payload) {
    return [];
  }

  const filename = payload.filename ?? "";
  const mimeType = payload.mimeType ?? "";
  const values = headers(payload);
  const rawContentId = values["content-id"]?.trim();
  const contentId = rawContentId?.replace(/^<(.+)>$/, "$1");
  const disposition = values["content-disposition"]?.trim() ?? "";
  const isBody =
    !filename && ["text/plain", "text/html"].includes(mimeType.toLowerCase());
  const current =
    payload.body?.attachmentId && !isBody
      ? [
          {
            attachmentId: payload.body.attachmentId,
            partId: payload.partId ?? "",
            filename,
            mimeType,
            size: payload.body.size ?? 0,
            inline: /^inline\b/i.test(disposition) || Boolean(contentId && !filename),
            ...(contentId ? { contentId } : {}),
          },
        ]
      : [];

  return [
    ...current,
    ...(payload.parts ?? []).flatMap((part) => listAttachmentParts(part)),
  ];
}

export function extractDriveLinks(text: string): GmailDriveLink[] {
  const pattern =
    /https?:\/\/(?:drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)|docs\.google\.com\/document\/d\/([A-Za-z0-9_-]+)|docs\.google\.com\/spreadsheets\/d\/([A-Za-z0-9_-]+)|docs\.google\.com\/presentation\/d\/([A-Za-z0-9_-]+)|drive\.google\.com\/drive\/folders\/([A-Za-z0-9_-]+)|drive\.google\.com\/open\?id=([A-Za-z0-9_-]+))/gi;
  const kinds: GmailDriveLink["kind"][] = [
    "file",
    "document",
    "spreadsheet",
    "presentation",
    "folder",
    "unknown",
  ];
  const links: GmailDriveLink[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const groupIndex = match.slice(1).findIndex(Boolean);
    const fileId = match[groupIndex + 1] ?? "";
    if (!seen.has(fileId)) {
      seen.add(fileId);
      links.push({ fileId, url: match[0], kind: kinds[groupIndex] ?? "unknown" });
    }
  }
  return links;
}

async function decodedBody(
  gmail: gmail_v1.Gmail,
  messageId: string,
  payload?: gmail_v1.Schema$MessagePart,
): Promise<string> {
  const plainParts = collectParts(payload, "text/plain");
  if (plainParts.length) {
    return (await Promise.all(plainParts.map((part) => partData(gmail, messageId, part))))
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  const htmlParts = collectParts(payload, "text/html");
  if (htmlParts.length) {
    const html = (await Promise.all(htmlParts.map((part) => partData(gmail, messageId, part))))
      .filter(Boolean)
      .join("\n");
    return htmlToText(html);
  }

  return (await partData(gmail, messageId, payload ?? {})).trim();
}

function messageMetadata(message: gmail_v1.Schema$Message): GmailSearchResult {
  const values = headers(message.payload);
  return {
    id: message.id ?? "",
    ...(message.threadId ? { threadId: message.threadId } : {}),
    snippet: message.snippet ?? "",
    ...(values.from ? { from: values.from } : {}),
    ...(values.to ? { to: values.to } : {}),
    ...(values.subject ? { subject: values.subject } : {}),
    ...(values.date ? { date: values.date } : {}),
  };
}

export async function searchMessages(
  client: Auth.OAuth2Client,
  query: string,
  maxResults: number,
  options: GmailSearchOptions = {},
): Promise<GmailSearchResult[]> {
  const gmail = gmailClient(client);
  const list = await gmail.users.messages.list({ userId: "me", q: query, maxResults });
  const messages = list.data.messages ?? [];
  const responses = await Promise.all(
    messages.map(({ id }) => {
      if (options.includeAttachments) {
        return gmail.users.messages.get({
          userId: "me",
          id: id ?? "",
          format: "full",
        });
      }
      return gmail.users.messages.get({
        userId: "me",
        id: id ?? "",
        format: "metadata",
        metadataHeaders: ["From", "To", "Subject", "Date"],
      });
    }),
  );
  return responses.map(({ data }) => ({
    ...messageMetadata(data),
    ...(options.includeAttachments
      ? {
          attachments: listAttachmentParts(data.payload).filter(
            (attachment) => options.includeInline || !attachment.inline,
          ),
        }
      : {}),
  }));
}

export async function getMessage(
  client: Auth.OAuth2Client,
  id: string,
  options: GmailMessageOptions = {},
): Promise<GmailMessage> {
  const gmail = gmailClient(client);
  const response = await gmail.users.messages.get({ userId: "me", id, format: "full" });
  const body = await decodedBody(gmail, id, response.data.payload);
  const attachments = listAttachmentParts(response.data.payload).filter(
    (attachment) => options.includeInline || !attachment.inline,
  );
  let driveLinks: GmailDriveLink[] | undefined;
  if (options.includeDriveLinks) {
    const htmlParts = collectParts(response.data.payload, "text/html");
    const rawHtml = await Promise.all(htmlParts.map((part) => partData(gmail, id, part)));
    driveLinks = extractDriveLinks([body, ...rawHtml].join("\n"));
  }
  return {
    ...messageMetadata(response.data),
    labelIds: response.data.labelIds ?? [],
    body,
    attachments,
    ...(driveLinks ? { driveLinks } : {}),
  };
}

function globPattern(pattern: string): RegExp {
  const expression = [...pattern]
    .map((character) => {
      if (character === "*") {
        return ".*";
      }
      if (character === "?") {
        return ".";
      }
      return character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("");
  return new RegExp(`^${expression}$`, "i");
}

function matchesMimeType(actual: string, expected?: string): boolean {
  if (!expected) {
    return true;
  }
  return expected.endsWith("/") ? actual.startsWith(expected) : actual === expected;
}

async function fetchAttachmentBytes(
  gmail: gmail_v1.Gmail,
  messageId: string,
  attachmentId: string,
): Promise<Buffer> {
  const response = await gmail.users.messages.attachments.get({
    userId: "me",
    messageId,
    id: attachmentId,
  });
  return decodeBase64UrlBytes(response.data.data);
}

export async function searchAttachments(
  client: Auth.OAuth2Client,
  input: GmailAttachmentSearchInput,
): Promise<GmailAttachmentRow[]> {
  const gmail = gmailClient(client);
  const query = input.query.toLowerCase().includes("has:attachment")
    ? input.query
    : `${input.query} has:attachment`.trim();
  const list = await gmail.users.messages.list({
    userId: "me",
    q: query,
    maxResults: input.maxResults,
  });
  const responses = await Promise.all(
    (list.data.messages ?? []).map(({ id }) =>
      gmail.users.messages.get({ userId: "me", id: id ?? "", format: "full" }),
    ),
  );
  const filenamePattern = input.filenamePattern
    ? globPattern(input.filenamePattern)
    : undefined;
  const rows = responses.flatMap(({ data }) => {
    const metadata = messageMetadata(data);
    return listAttachmentParts(data.payload)
      .filter((attachment) => input.includeInline || !attachment.inline)
      .filter((attachment) => !filenamePattern || filenamePattern.test(attachment.filename))
      .filter((attachment) => matchesMimeType(attachment.mimeType, input.mimeType))
      .map(
        (attachment): GmailAttachmentRow => ({
          ...attachment,
          messageId: data.id ?? "",
          ...(data.threadId ? { threadId: data.threadId } : {}),
          ...(metadata.subject ? { subject: metadata.subject } : {}),
          ...(metadata.from ? { from: metadata.from } : {}),
          ...(metadata.date ? { date: metadata.date } : {}),
        }),
      );
  });

  const previewChars = Math.min(Math.max(input.previewChars ?? 0, 0), 4000);
  if (previewChars === 0) {
    return rows;
  }
  return Promise.all(
    rows.map(async (row): Promise<GmailAttachmentRow> => {
      if (!isTextExtractable(row.mimeType, row.filename)) {
        return { ...row, preview: null };
      }
      try {
        const bytes = await fetchAttachmentBytes(gmail, row.messageId, row.attachmentId);
        const text = await extractText(bytes, row.mimeType, row.filename);
        return {
          ...row,
          preview: text.slice(0, previewChars),
          previewTruncated: text.length > previewChars,
        };
      } catch (error) {
        return {
          ...row,
          preview: null,
          previewError: error instanceof Error ? error.message : String(error),
        };
      }
    }),
  );
}

function safeFilename(candidate: string, attachmentId: string): string {
  const leaf = candidate.split(/[\\/]/).filter(Boolean).at(-1) ?? "";
  const sanitized = leaf.replace(/[^A-Za-z0-9._ -]/g, "_").replace(/^\.+/, "");
  return sanitized || `attachment-${attachmentId.slice(0, 12)}`;
}

export async function getAttachment(
  client: Auth.OAuth2Client,
  input: GmailAttachmentInput,
): Promise<Record<string, unknown>> {
  const gmail = gmailClient(client);
  const message = await gmail.users.messages.get({
    userId: "me",
    id: input.messageId,
    format: "full",
  });
  const attachment = listAttachmentParts(message.data.payload).find(
    ({ attachmentId }) => attachmentId === input.attachmentId,
  );
  if (!attachment) {
    throw new Error("Attachment not found on message.");
  }
  const bytes = await fetchAttachmentBytes(gmail, input.messageId, input.attachmentId);
  const common = {
    messageId: input.messageId,
    attachmentId: input.attachmentId,
    filename: attachment.filename,
    mimeType: attachment.mimeType,
    size: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };

  if (input.mode === "text") {
    if (!isTextExtractable(attachment.mimeType, attachment.filename)) {
      return {
        ...common,
        mode: "text",
        text: null,
        note:
          `Attachment is not text-extractable (${attachment.mimeType}); ` +
          'use mode "save".',
      };
    }
    const text = await extractText(bytes, attachment.mimeType, attachment.filename);
    const maxChars = input.maxChars ?? 20_000;
    return {
      ...common,
      mode: "text",
      text: maxChars === 0 ? text : text.slice(0, maxChars),
      chars: text.length,
      truncated: maxChars > 0 && text.length > maxChars,
    };
  }

  if (input.mode === "save") {
    if (!input.outputDir) {
      throw new Error('outputDir is required for mode "save".');
    }
    const outputDir = resolve(input.outputDir);
    await mkdir(outputDir, { recursive: true });
    const filename = safeFilename(
      input.filename || attachment.filename || `attachment-${input.attachmentId.slice(0, 12)}`,
      input.attachmentId,
    );
    const path = resolve(outputDir, filename);
    try {
      await writeFile(path, bytes, { flag: input.overwrite ? "w" : "wx" });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "EEXIST") {
        throw new Error(`File exists: ${path} (pass overwrite: true).`);
      }
      throw error;
    }
    return { ...common, mode: "save", path };
  }

  if (bytes.length > BASE64_LIMIT_BYTES) {
    throw new Error(
      `Attachment is ${bytes.length} bytes; inline base64 is capped at 1048576. ` +
        'Use mode "save".',
    );
  }
  return { ...common, mode: "base64", data: bytes.toString("base64") };
}

export async function getProfileEmail(client: Auth.OAuth2Client): Promise<string> {
  const response = await gmailClient(client).users.getProfile({ userId: "me" });
  if (!response.data.emailAddress) {
    throw new Error("Google did not return an email address for the authorized account.");
  }
  return response.data.emailAddress;
}

// RFC 5322 headers are ASCII-only; non-ASCII values must be RFC 2047 encoded-words.
function encodeHeaderValue(value: string): string {
  if (/^[\x20-\x7e]*$/.test(value)) {
    return value;
  }
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function encodeAddress(address: string): string {
  const match = /^(.*?)(<[^<>]*>)$/.exec(address.trim());
  if (!match) {
    return address;
  }
  const [, name, angleAddr] = match;
  const displayName = name.trim();
  if (!displayName) {
    return address;
  }
  return `${encodeHeaderValue(displayName)} ${angleAddr}`;
}

function addressList(addresses: string[]): string {
  return addresses.map(encodeAddress).join(", ");
}

export async function createDraft(
  client: Auth.OAuth2Client,
  input: GmailDraftInput,
): Promise<GmailDraft> {
  const gmail = gmailClient(client);
  let threadId: string | undefined;
  let replyMessageId: string | undefined;
  let derivedTo: string[] | undefined;
  let derivedSubject: string | undefined;

  if (input.replyToMessageId) {
    const reply = await gmail.users.messages.get({
      userId: "me",
      id: input.replyToMessageId,
      format: "metadata",
      metadataHeaders: ["Message-ID", "Subject", "From", "To", "Reply-To"],
    });
    const values = headers(reply.data.payload);
    threadId = reply.data.threadId ?? undefined;
    replyMessageId = values["message-id"] || undefined;
    derivedTo = values["reply-to"]
      ? [values["reply-to"]]
      : values.from
        ? [values.from]
        : undefined;
    if (values.subject) {
      derivedSubject = /^re:/i.test(values.subject) ? values.subject : `Re: ${values.subject}`;
    }
  }

  const to = input.to ?? derivedTo;
  const subject = input.subject ?? derivedSubject;
  if (!to?.length) {
    throw new Error("Draft recipient is required.");
  }
  if (!subject?.trim()) {
    throw new Error("Draft subject is required.");
  }

  const message = [
    `To: ${addressList(to)}`,
    ...(input.cc?.length ? [`Cc: ${addressList(input.cc)}`] : []),
    ...(input.bcc?.length ? [`Bcc: ${addressList(input.bcc)}`] : []),
    `Subject: ${encodeHeaderValue(subject)}`,
    ...(replyMessageId ? [`In-Reply-To: ${replyMessageId}`, `References: ${replyMessageId}`] : []),
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    input.body,
  ].join("\r\n");
  const raw = Buffer.from(message, "utf8").toString("base64url");
  const response = await gmail.users.drafts.create({
    userId: "me",
    requestBody: {
      message: { raw, ...(threadId ? { threadId } : {}) },
    },
  });

  return {
    draftId: response.data.id ?? "",
    messageId: response.data.message?.id ?? "",
    ...(response.data.message?.threadId ? { threadId: response.data.message.threadId } : {}),
    to,
    subject,
  };
}

export async function deleteDraft(
  client: Auth.OAuth2Client,
  draftId: string,
): Promise<DeletedGmailDraft> {
  await gmailClient(client).users.drafts.delete({ userId: "me", id: draftId });
  return { draftId, deleted: true };
}
