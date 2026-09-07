import { docs as docsApi, type docs_v1 } from "@googleapis/docs";
import type { OAuth2Client } from "google-auth-library";

export interface EditedDocument {
  documentId: string;
  title: string;
}

export interface ReplacedDocument extends EditedDocument {
  occurrencesChanged: number;
}

function docsClient(client: OAuth2Client): docs_v1.Docs {
  return docsApi({
    version: "v1",
    auth: client as unknown as docs_v1.Options["auth"],
  });
}

function revisionConflict(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const apiError = error as {
    code?: unknown;
    message?: unknown;
    response?: {
      status?: unknown;
      data?: { error?: { message?: unknown } };
    };
  };
  const status = apiError.response?.status ?? apiError.code;
  const messages = [apiError.message, apiError.response?.data?.error?.message]
    .filter((message): message is string => typeof message === "string")
    .join(" ");

  return Number(status) === 400 && /revision/i.test(messages);
}

function documentResult(
  document: docs_v1.Schema$Document,
  documentId: string,
): EditedDocument {
  return {
    documentId: document.documentId ?? documentId,
    title: document.title ?? "",
  };
}

export async function appendText(
  client: OAuth2Client,
  documentId: string,
  text: string,
): Promise<EditedDocument> {
  const docs = docsClient(client);
  const documentResponse = await docs.documents.get({
    documentId,
    fields: "documentId,title,revisionId",
  });
  const document = documentResponse.data;

  try {
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [{ insertText: { endOfSegmentLocation: { segmentId: "" }, text } }],
        writeControl: { requiredRevisionId: document.revisionId },
      },
    });
  } catch (error) {
    if (revisionConflict(error)) {
      throw new Error("Document changed while editing; re-read and retry.");
    }
    throw error;
  }

  return documentResult(document, documentId);
}

export async function replaceText(
  client: OAuth2Client,
  documentId: string,
  find: string,
  replaceWith: string,
  matchCase = true,
): Promise<ReplacedDocument> {
  const docs = docsClient(client);
  const documentResponse = await docs.documents.get({
    documentId,
    fields: "documentId,title,revisionId",
  });
  const document = documentResponse.data;

  try {
    const response = await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            replaceAllText: {
              containsText: { text: find, matchCase },
              replaceText: replaceWith,
            },
          },
        ],
        writeControl: { requiredRevisionId: document.revisionId },
      },
    });
    return {
      ...documentResult(document, documentId),
      occurrencesChanged:
        response.data.replies?.[0]?.replaceAllText?.occurrencesChanged ?? 0,
    };
  } catch (error) {
    if (revisionConflict(error)) {
      throw new Error("Document changed while editing; re-read and retry.");
    }
    throw error;
  }
}
