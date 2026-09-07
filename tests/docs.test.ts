import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { docsFactory, documentsBatchUpdate, documentsGet } = vi.hoisted(() => {
  const documentsBatchUpdate = vi.fn();
  const documentsGet = vi.fn();
  return {
    docsFactory: vi.fn(() => ({
      documents: { batchUpdate: documentsBatchUpdate, get: documentsGet },
    })),
    documentsBatchUpdate,
    documentsGet,
  };
});

vi.mock("@googleapis/docs", () => ({
  docs: docsFactory,
}));

import { appendText, replaceText } from "../src/providers/google/docs.js";
import { docsAppendText, docsReplaceText } from "../src/tools.js";

const client = {} as never;
let home: string;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-docs-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.clearAllMocks();
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("Google Docs edits", () => {
  it("appends text at the end of the document with revision control", async () => {
    documentsGet.mockResolvedValue({
      data: { documentId: "doc-1", title: "Notes", revisionId: "revision-1" },
    });
    documentsBatchUpdate.mockResolvedValue({ data: {} });

    await expect(appendText(client, "doc-1", "New paragraph")).resolves.toEqual({
      documentId: "doc-1",
      title: "Notes",
    });
    expect(docsFactory).toHaveBeenCalledWith({ version: "v1", auth: client });
    expect(documentsGet).toHaveBeenCalledWith({
      documentId: "doc-1",
      fields: "documentId,title,revisionId",
    });
    expect(documentsBatchUpdate).toHaveBeenCalledWith({
      documentId: "doc-1",
      requestBody: {
        requests: [
          {
            insertText: {
              endOfSegmentLocation: { segmentId: "" },
              text: "New paragraph",
            },
          },
        ],
        writeControl: { requiredRevisionId: "revision-1" },
      },
    });
  });

  it("replaces matching text case-sensitively by default and maps occurrences", async () => {
    documentsGet.mockResolvedValue({
      data: { documentId: "doc-2", title: "Plan", revisionId: "revision-2" },
    });
    documentsBatchUpdate.mockResolvedValue({
      data: { replies: [{ replaceAllText: { occurrencesChanged: 3 } }] },
    });

    await expect(replaceText(client, "doc-2", "old", "new")).resolves.toEqual({
      documentId: "doc-2",
      title: "Plan",
      occurrencesChanged: 3,
    });
    expect(documentsBatchUpdate).toHaveBeenCalledWith({
      documentId: "doc-2",
      requestBody: {
        requests: [
          {
            replaceAllText: {
              containsText: { text: "old", matchCase: true },
              replaceText: "new",
            },
          },
        ],
        writeControl: { requiredRevisionId: "revision-2" },
      },
    });
  });

  it("maps an absent replace reply to zero occurrences", async () => {
    documentsGet.mockResolvedValue({
      data: { documentId: "doc-3", title: "Agenda", revisionId: "revision-3" },
    });
    documentsBatchUpdate.mockResolvedValue({ data: {} });

    await expect(
      replaceText(client, "doc-3", "missing", "replacement", false),
    ).resolves.toEqual({
      documentId: "doc-3",
      title: "Agenda",
      occurrencesChanged: 0,
    });
  });

  it("rethrows revision conflicts with retry guidance", async () => {
    documentsGet.mockResolvedValue({
      data: { documentId: "doc-4", title: "Shared", revisionId: "revision-4" },
    });
    documentsBatchUpdate.mockRejectedValue({
      response: {
        status: 400,
        data: { error: { message: "The required revision ID does not match." } },
      },
    });

    await expect(appendText(client, "doc-4", "Concurrent edit")).rejects.toThrow(
      "Document changed while editing; re-read and retry.",
    );
  });

  it.each([
    ["docsAppendText", () => docsAppendText("all", "doc-1", "text")],
    [
      "docsReplaceText",
      () => docsReplaceText("all", "doc-1", "find", "replace"),
    ],
  ])("rejects all-account fan-out for %s", async (_name, invoke) => {
    await expect(invoke()).rejects.toThrow(
      'Write tools require one explicit account alias; "all" is not permitted.',
    );
  });
});
