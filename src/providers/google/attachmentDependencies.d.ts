declare module "mammoth" {
  interface RawTextResult {
    value: string;
  }

  const mammoth: {
    extractRawText(input: { buffer: Buffer }): Promise<RawTextResult>;
  };

  export default mammoth;
}

declare module "pdf-parse/lib/pdf-parse.js" {
  interface PdfParseResult {
    text: string;
  }

  export default function pdfParse(bytes: Buffer): Promise<PdfParseResult>;
}
