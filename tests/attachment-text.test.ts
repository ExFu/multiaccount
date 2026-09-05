import { beforeEach, describe, expect, it, vi } from "vitest";

const { extractRawText, pdfParse } = vi.hoisted(() => ({
  extractRawText: vi.fn(),
  pdfParse: vi.fn(),
}));

vi.mock("mammoth", () => ({
  default: { extractRawText },
}));

vi.mock("pdf-parse/lib/pdf-parse.js", () => ({
  default: pdfParse,
}));

import { extractText, isTextExtractable } from "../src/providers/google/attachmentText.js";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("attachment text extraction", () => {
  it.each([
    ["text/plain", "notes.txt", true],
    ["text/markdown", "README.md", true],
    ["application/json", "data.json", true],
    ["application/xml", "data.xml", true],
    ["text/csv", "data.csv", true],
    ["application/pdf", "report.pdf", true],
    [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "report.docx",
      true,
    ],
    ["application/octet-stream", "NOTES.MD", true],
    ["application/octet-stream", "report.pdf", true],
    ["application/octet-stream", "report.docx", true],
    ["application/octet-stream", "archive.zip", false],
    ["image/png", "image.png", false],
  ])("classifies %s (%s)", (mimeType, filename, expected) => {
    expect(isTextExtractable(mimeType, filename)).toBe(expected);
  });

  it("decodes UTF-8 text", async () => {
    await expect(
      extractText(Buffer.from("Hello, café", "utf8"), "text/plain", "hello.txt"),
    ).resolves.toBe("Hello, café");
  });

  it("extracts DOCX text with mammoth", async () => {
    extractRawText.mockResolvedValue({ value: "Document text" });
    const bytes = Buffer.from("minimal mocked docx");

    await expect(
      extractText(
        bytes,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "report.docx",
      ),
    ).resolves.toBe("Document text");
    expect(extractRawText).toHaveBeenCalledWith({ buffer: bytes });
  });

  it("extracts PDF text with pdf-parse", async () => {
    pdfParse.mockResolvedValue({ text: "PDF text" });
    const bytes = Buffer.from("minimal mocked pdf");

    await expect(extractText(bytes, "application/pdf", "report.pdf")).resolves.toBe(
      "PDF text",
    );
    expect(pdfParse).toHaveBeenCalledWith(bytes);
  });

  it("rejects unsupported types with the MIME type in the error", async () => {
    await expect(
      extractText(Buffer.from("binary"), "image/png", "image.png"),
    ).rejects.toThrow("Text extraction is not supported for image/png.");
  });
});
