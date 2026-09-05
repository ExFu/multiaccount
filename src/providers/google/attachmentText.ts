const PDF_MIME_TYPE = "application/pdf";
const DOCX_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function normalizedMimeType(mimeType: string): string {
  return mimeType.split(";", 1)[0]?.trim().toLowerCase() ?? "";
}

function extension(filename: string): string {
  const match = /\.[^.]+$/.exec(filename.toLowerCase());
  return match?.[0] ?? "";
}

export function isTextExtractable(mimeType: string, filename: string): boolean {
  const normalized = normalizedMimeType(mimeType);
  if (
    normalized.startsWith("text/") ||
    normalized === "application/json" ||
    normalized === "application/xml" ||
    normalized === PDF_MIME_TYPE ||
    normalized === DOCX_MIME_TYPE
  ) {
    return true;
  }
  return (
    normalized === "application/octet-stream" &&
    [".txt", ".md", ".csv", ".json", ".xml", ".pdf", ".docx"].includes(
      extension(filename),
    )
  );
}

export async function extractText(
  bytes: Buffer,
  mimeType: string,
  filename: string,
): Promise<string> {
  const normalized = normalizedMimeType(mimeType);
  const fileExtension = extension(filename);
  const octetStream = normalized === "application/octet-stream";

  if (normalized === PDF_MIME_TYPE || (octetStream && fileExtension === ".pdf")) {
    const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
    return (await pdfParse(bytes)).text;
  }
  if (normalized === DOCX_MIME_TYPE || (octetStream && fileExtension === ".docx")) {
    const { default: mammoth } = await import("mammoth");
    return (await mammoth.extractRawText({ buffer: bytes })).value;
  }
  if (
    normalized.startsWith("text/") ||
    normalized === "application/json" ||
    normalized === "application/xml" ||
    (octetStream && [".txt", ".md", ".csv", ".json", ".xml"].includes(fileExtension))
  ) {
    return bytes.toString("utf8");
  }
  throw new Error(`Text extraction is not supported for ${mimeType}.`);
}
