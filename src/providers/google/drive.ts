import { google, type Auth, type drive_v3 } from "googleapis";

const CONTENT_LIMIT_BYTES = 262_144;

const EXPORT_MIME_TYPES: Record<string, string> = {
  "application/vnd.google-apps.document": "text/plain",
  "application/vnd.google-apps.spreadsheet": "text/csv",
  "application/vnd.google-apps.presentation": "text/plain",
};

export interface DriveSearchResult {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
  owner?: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  body: string;
  truncated?: true;
  note?: string;
}

function driveClient(client: Auth.OAuth2Client): drive_v3.Drive {
  return google.drive({ version: "v3", auth: client });
}

function responseBytes(data: unknown): Buffer {
  if (Buffer.isBuffer(data)) {
    return data;
  }
  if (data instanceof ArrayBuffer) {
    return Buffer.from(data);
  }
  if (ArrayBuffer.isView(data)) {
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  }
  return Buffer.from(typeof data === "string" ? data : String(data ?? ""), "utf8");
}

function contentResult(data: unknown): Pick<DriveFile, "body" | "truncated" | "note"> {
  const bytes = responseBytes(data);
  if (bytes.byteLength <= CONTENT_LIMIT_BYTES) {
    return { body: bytes.toString("utf8") };
  }
  return {
    body: bytes.subarray(0, CONTENT_LIMIT_BYTES).toString("utf8"),
    truncated: true,
    note: `content truncated at ${CONTENT_LIMIT_BYTES} bytes`,
  };
}

export async function searchFiles(
  client: Auth.OAuth2Client,
  query: string,
  maxResults: number,
): Promise<DriveSearchResult[]> {
  const response = await driveClient(client).files.list({
    q: query,
    pageSize: maxResults,
    fields:
      "files(id,name,mimeType,modifiedTime,size,webViewLink,owners(emailAddress))",
  });

  return (response.data.files ?? []).map((file) => ({
    id: file.id ?? "",
    name: file.name ?? "",
    mimeType: file.mimeType ?? "",
    ...(file.modifiedTime ? { modifiedTime: file.modifiedTime } : {}),
    ...(file.size ? { size: file.size } : {}),
    ...(file.webViewLink ? { webViewLink: file.webViewLink } : {}),
    ...(file.owners?.[0]?.emailAddress ? { owner: file.owners[0].emailAddress } : {}),
  }));
}

export async function readFile(
  client: Auth.OAuth2Client,
  fileId: string,
): Promise<DriveFile> {
  const drive = driveClient(client);
  const metadataResponse = await drive.files.get({
    fileId,
    fields: "id,name,mimeType",
  });
  const metadata = metadataResponse.data;
  const id = metadata.id ?? fileId;
  const name = metadata.name ?? "";
  const mimeType = metadata.mimeType ?? "";
  const base = { id, name, mimeType };
  const exportMimeType = EXPORT_MIME_TYPES[mimeType];

  if (exportMimeType) {
    const response = await drive.files.export(
      { fileId, mimeType: exportMimeType },
      { responseType: "arraybuffer" },
    );
    return { ...base, ...contentResult(response.data) };
  }

  if (mimeType.startsWith("text/") || mimeType === "application/json") {
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" },
    );
    return { ...base, ...contentResult(response.data) };
  }

  return { ...base, body: "", note: "binary file; not fetched" };
}
