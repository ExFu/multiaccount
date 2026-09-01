import { execFile } from "node:child_process";
import { randomBytes } from "node:crypto";

const SECURITY_PATH = "/usr/bin/security";
const SERVICE = "exfu-multiaccount";
const ACCOUNT = "token-key";

export interface KeyProvider {
  getKey(): Promise<Buffer>;
}

interface ExecFileFailure extends Error {
  code?: number | string;
  stderr?: string;
}

function runSecurity(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(SECURITY_PATH, args, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        (error as ExecFileFailure).stderr = stderr;
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

function isNotFound(error: unknown): boolean {
  const failure = error as ExecFileFailure;
  const stderr = typeof failure?.stderr === "string" ? failure.stderr.toLowerCase() : "";
  return (
    failure?.code === 44 ||
    stderr.includes("could not be found") ||
    stderr.includes("item not found")
  );
}

function decodeKey(value: string): Buffer {
  const hex = value.trim();
  if (!/^[0-9a-f]{64}$/i.test(hex)) {
    throw new Error("The ExFu token encryption key in macOS Keychain is invalid.");
  }
  return Buffer.from(hex, "hex");
}

export class MacKeychainKeyProvider implements KeyProvider {
  private keyPromise?: Promise<Buffer>;

  getKey(): Promise<Buffer> {
    this.keyPromise ??= this.loadOrCreateKey();
    return this.keyPromise;
  }

  private async loadOrCreateKey(): Promise<Buffer> {
    try {
      return decodeKey(
        await runSecurity([
          "find-generic-password",
          "-s",
          SERVICE,
          "-a",
          ACCOUNT,
          "-w",
        ]),
      );
    } catch (error) {
      if (!isNotFound(error)) {
        if (error instanceof Error && error.message.includes("Keychain is invalid")) {
          throw error;
        }
        throw new Error("Could not access the ExFu token encryption key in macOS Keychain.");
      }
    }

    const key = randomBytes(32);
    try {
      await runSecurity([
        "add-generic-password",
        "-U",
        "-s",
        SERVICE,
        "-a",
        ACCOUNT,
        "-w",
        key.toString("hex"),
      ]);
    } catch {
      throw new Error("Could not store the ExFu token encryption key in macOS Keychain.");
    }
    return key;
  }
}
