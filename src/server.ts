import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  accountsAdd,
  accountsList,
  calendarCreateEvent,
  calendarEvents,
  calendarUpdateEvent,
  driveCreateFile,
  driveReadFile,
  driveSearch,
  driveUpdateFile,
  gmailCreateDraft,
  gmailGetMessage,
  gmailSearch,
} from "./tools.js";

function toolResult(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  };
}

export function createServer(): McpServer {
  const server = new McpServer({ name: "exfu-multiaccount", version: "0.1.0" });

  server.registerTool(
    "accounts_list",
    {
      title: "List accounts",
      description: "List configured account metadata. Credentials are never returned.",
      inputSchema: {},
    },
    async () => toolResult(await accountsList()),
  );

  server.registerTool(
    "accounts_add",
    {
      title: "Add Google account",
      description: "Authorize and register a read-only Gmail account under an alias.",
      inputSchema: {
        alias: z.string().describe("Unique lowercase kebab-case alias"),
        extraInfo: z.string().optional().describe("Free-text description of what this account is for"),
      },
    },
    async ({ alias, extraInfo }) => toolResult(await accountsAdd(alias, extraInfo)),
  );

  server.registerTool(
    "gmail_search",
    {
      title: "Search Gmail",
      description: "Search one Gmail account by alias, or all configured accounts.",
      inputSchema: {
        account: z.string().describe('Account alias or "all"'),
        query: z.string().describe("Gmail search query"),
        maxResults: z.number().int().min(1).max(100).default(10),
      },
    },
    async ({ account, query, maxResults }) =>
      toolResult(await gmailSearch(account, query, maxResults)),
  );

  server.registerTool(
    "gmail_get_message",
    {
      title: "Get Gmail message",
      description: "Read a full Gmail message from one account, or try all configured accounts.",
      inputSchema: {
        account: z.string().describe('Account alias or "all"'),
        messageId: z.string().min(1).describe("Gmail message ID"),
      },
    },
    async ({ account, messageId }) =>
      toolResult(await gmailGetMessage(account, messageId)),
  );

  server.registerTool(
    "drive_search",
    {
      title: "Search Google Drive",
      description: "Search one Google Drive account by alias, or all configured accounts.",
      inputSchema: {
        account: z.string().describe('Account alias or "all"'),
        query: z.string().describe("Google Drive query using Drive search syntax"),
        maxResults: z.number().int().min(1).max(1000).default(10),
      },
    },
    async ({ account, query, maxResults }) =>
      toolResult(await driveSearch(account, query, maxResults)),
  );

  server.registerTool(
    "drive_read_file",
    {
      title: "Read Google Drive file",
      description: "Read a text or Google-native Drive file from one account, or try all accounts.",
      inputSchema: {
        account: z.string().describe('Account alias or "all"'),
        fileId: z.string().min(1).describe("Google Drive file ID"),
      },
    },
    async ({ account, fileId }) => toolResult(await driveReadFile(account, fileId)),
  );

  server.registerTool(
    "calendar_events",
    {
      title: "List Google Calendar events",
      description: "List events from one primary Google Calendar, or all configured accounts.",
      inputSchema: {
        account: z.string().describe('Account alias or "all"'),
        timeMin: z.string().datetime({ offset: true }).optional().describe("ISO-8601 lower bound"),
        timeMax: z.string().datetime({ offset: true }).optional().describe("ISO-8601 upper bound"),
        query: z.string().optional().describe("Free-text event search query"),
        maxResults: z.number().int().min(1).max(2500).default(25),
      },
    },
    async ({ account, timeMin, timeMax, query, maxResults }) =>
      toolResult(await calendarEvents(account, { timeMin, timeMax, query, maxResults })),
  );

  server.registerTool(
    "drive_create_file",
    {
      title: "Create Google Drive file",
      description: 'Create a file in Google Drive. Requires one explicit account alias; "all" is rejected.',
      inputSchema: {
        account: z.string().describe("Account alias"),
        name: z.string().min(1).describe("File name"),
        content: z.string().describe("File content"),
        mimeType: z.string().optional().describe("Media MIME type; defaults to text/plain"),
        folderId: z.string().optional().describe("Parent Google Drive folder ID"),
        asGoogleDoc: z.boolean().optional().describe("Convert the uploaded content to a Google Doc"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async ({ account, name, content, mimeType, folderId, asGoogleDoc }) =>
      toolResult(
        await driveCreateFile(account, { name, content, mimeType, folderId, asGoogleDoc }),
      ),
  );

  server.registerTool(
    "drive_update_file",
    {
      title: "Update Google Drive file content",
      description: 'Replace a supported Drive file\'s content. Requires one explicit account alias; "all" is rejected.',
      inputSchema: {
        account: z.string().describe("Account alias"),
        fileId: z.string().min(1).describe("Google Drive file ID"),
        content: z.string().describe("Replacement file content"),
        contentMimeType: z.string().optional().describe("MIME type of the replacement content"),
      },
      annotations: { readOnlyHint: false, destructiveHint: true },
    },
    async ({ account, fileId, content, contentMimeType }) =>
      toolResult(await driveUpdateFile(account, fileId, content, contentMimeType)),
  );

  server.registerTool(
    "calendar_create_event",
    {
      title: "Create Google Calendar event",
      description: 'Create an event without emailing attendees. Requires one explicit account alias; "all" is rejected.',
      inputSchema: {
        account: z.string().describe("Account alias"),
        summary: z.string().min(1).describe("Event summary"),
        start: z.string().min(1).describe("ISO date or date-time start"),
        end: z.string().min(1).describe("ISO date or date-time end"),
        timeZone: z.string().optional().describe("IANA time zone for date-time values"),
        description: z.string().optional().describe("Event description"),
        location: z.string().optional().describe("Event location"),
        attendees: z.array(z.string()).optional().describe("Attendee email addresses"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async ({ account, summary, start, end, timeZone, description, location, attendees }) =>
      toolResult(
        await calendarCreateEvent(account, {
          summary,
          start,
          end,
          timeZone,
          description,
          location,
          attendees,
        }),
      ),
  );

  server.registerTool(
    "calendar_update_event",
    {
      title: "Update Google Calendar event",
      description: 'Update an event without emailing attendees. Requires one explicit account alias; "all" is rejected.',
      inputSchema: {
        account: z.string().describe("Account alias"),
        eventId: z.string().min(1).describe("Google Calendar event ID"),
        summary: z.string().optional().describe("Event summary"),
        start: z.string().optional().describe("ISO date or date-time start"),
        end: z.string().optional().describe("ISO date or date-time end"),
        timeZone: z.string().optional().describe("IANA time zone for date-time values"),
        description: z.string().optional().describe("Event description"),
        location: z.string().optional().describe("Event location"),
        attendees: z.array(z.string()).optional().describe("Attendee email addresses"),
      },
      annotations: { readOnlyHint: false, destructiveHint: true },
    },
    async ({ account, eventId, summary, start, end, timeZone, description, location, attendees }) =>
      toolResult(
        await calendarUpdateEvent(account, eventId, {
          summary,
          start,
          end,
          timeZone,
          description,
          location,
          attendees,
        }),
      ),
  );

  server.registerTool(
    "gmail_create_draft",
    {
      title: "Create Gmail draft",
      description: 'Save a Gmail draft; it is never sent. Requires one explicit account alias; "all" is rejected.',
      inputSchema: {
        account: z.string().describe("Account alias"),
        to: z.array(z.string()).optional().describe("To recipients"),
        cc: z.array(z.string()).optional().describe("Cc recipients"),
        bcc: z.array(z.string()).optional().describe("Bcc recipients"),
        subject: z.string().optional().describe("Draft subject"),
        body: z.string().describe("Plain-text message body"),
        replyToMessageId: z.string().optional().describe("Gmail message ID to reply to"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async ({ account, to, cc, bcc, subject, body, replyToMessageId }) =>
      toolResult(
        await gmailCreateDraft(account, { to, cc, bcc, subject, body, replyToMessageId }),
      ),
  );

  return server;
}

export async function startServer(): Promise<void> {
  await createServer().connect(new StdioServerTransport());
}
