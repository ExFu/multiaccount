import { drive as driveApi, type drive_v3 } from "@googleapis/drive";
import type { OAuth2Client } from "google-auth-library";

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

export interface CreateFileOptions {
  name: string;
  content: string;
  mimeType?: string;
  folderId?: string;
  asGoogleDoc?: boolean;
}

export interface CreatedDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
}

export interface UpdatedDriveFile extends CreatedDriveFile {
  modifiedTime?: string;
}

export interface TrashedDriveFile {
  id: string;
  name: string;
  mimeType: string;
  trashed: true;
}

function driveClient(client: OAuth2Client): drive_v3.Drive {
  return driveApi({
    version: "v3",
    auth: client as unknown as drive_v3.Options["auth"],
  });
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
  client: OAuth2Client,
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
  client: OAuth2Client,
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

export async function createFile(
  client: OAuth2Client,
  options: CreateFileOptions,
): Promise<CreatedDriveFile> {
  const response = await driveClient(client).files.create({
    requestBody: {
      name: options.name,
      ...(options.folderId ? { parents: [options.folderId] } : {}),
      ...(options.asGoogleDoc
        ? { mimeType: "application/vnd.google-apps.document" }
        : {}),
    },
    media: {
      mimeType: options.mimeType ?? "text/plain",
      body: options.content,
    },
    fields: "id,name,mimeType,webViewLink",
  });
  const file = response.data;
  return {
    id: file.id ?? "",
    name: file.name ?? "",
    mimeType: file.mimeType ?? "",
    ...(file.webViewLink ? { webViewLink: file.webViewLink } : {}),
  };
}

export async function updateFileContent(
  client: OAuth2Client,
  fileId: string,
  content: string,
  contentMimeType?: string,
): Promise<UpdatedDriveFile> {
  const drive = driveClient(client);
  const metadataResponse = await drive.files.get({
    fileId,
    fields: "id,name,mimeType",
  });
  const existingMimeType = metadataResponse.data.mimeType ?? "";
  let mediaMimeType: string;

  if (existingMimeType === "application/vnd.google-apps.document") {
    mediaMimeType = contentMimeType ?? "text/plain";
  } else if (
    existingMimeType === "application/vnd.google-apps.spreadsheet" ||
    existingMimeType === "application/vnd.google-apps.presentation"
  ) {
    throw new Error("Updating Google Sheets/Slides is not supported.");
  } else if (existingMimeType.startsWith("text/") || existingMimeType === "application/json") {
    mediaMimeType = contentMimeType ?? existingMimeType;
  } else {
    throw new Error("Updating binary files is not supported.");
  }

  const response = await drive.files.update({
    fileId,
    media: { mimeType: mediaMimeType, body: content },
    fields: "id,name,mimeType,modifiedTime,webViewLink",
  });
  const file = response.data;
  return {
    id: file.id ?? fileId,
    name: file.name ?? "",
    mimeType: file.mimeType ?? existingMimeType,
    ...(file.modifiedTime ? { modifiedTime: file.modifiedTime } : {}),
    ...(file.webViewLink ? { webViewLink: file.webViewLink } : {}),
  };
}

export async function trashFile(
  client: OAuth2Client,
  fileId: string,
): Promise<TrashedDriveFile> {
  const response = await driveClient(client).files.update({
    fileId,
    requestBody: { trashed: true },
    fields: "id,name,mimeType,trashed",
  });
  const file = response.data;
  return {
    id: file.id ?? fileId,
    name: file.name ?? "",
    mimeType: file.mimeType ?? "",
    trashed: true,
  };
}
