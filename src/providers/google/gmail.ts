import { google, type Auth, type gmail_v1 } from "googleapis";

export interface GmailSearchResult {
  id: string;
  threadId?: string;
  snippet: string;
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
}

export interface GmailMessage extends GmailSearchResult {
  labelIds: string[];
  body: string;
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
  if (!data) {
    return "";
  }
  return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
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
): Promise<GmailSearchResult[]> {
  const gmail = gmailClient(client);
  const list = await gmail.users.messages.list({ userId: "me", q: query, maxResults });
  const messages = list.data.messages ?? [];
  const responses = await Promise.all(
    messages.map(({ id }) =>
      gmail.users.messages.get({
        userId: "me",
        id: id ?? "",
        format: "metadata",
        metadataHeaders: ["From", "To", "Subject", "Date"],
      }),
    ),
  );
  return responses.map(({ data }) => messageMetadata(data));
}

export async function getMessage(
  client: Auth.OAuth2Client,
  id: string,
): Promise<GmailMessage> {
  const gmail = gmailClient(client);
  const response = await gmail.users.messages.get({ userId: "me", id, format: "full" });
  return {
    ...messageMetadata(response.data),
    labelIds: response.data.labelIds ?? [],
    body: await decodedBody(gmail, id, response.data.payload),
  };
}

export async function getProfileEmail(client: Auth.OAuth2Client): Promise<string> {
  const response = await gmailClient(client).users.getProfile({ userId: "me" });
  if (!response.data.emailAddress) {
    throw new Error("Google did not return an email address for the authorized account.");
  }
  return response.data.emailAddress;
}
