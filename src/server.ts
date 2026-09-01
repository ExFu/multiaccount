import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  accountsAdd,
  accountsList,
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

  return server;
}

export async function startServer(): Promise<void> {
  await createServer().connect(new StdioServerTransport());
}
