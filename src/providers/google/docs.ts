import { google, type Auth, type docs_v1 } from "googleapis";

export interface EditedDocument {
  documentId: string;
  title: string;
}

export interface ReplacedDocument extends EditedDocument {
  occurrencesChanged: number;
}

function docsClient(client: Auth.OAuth2Client): docs_v1.Docs {
  return google.docs({ version: "v1", auth: client });
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
  client: Auth.OAuth2Client,
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
  client: Auth.OAuth2Client,
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
