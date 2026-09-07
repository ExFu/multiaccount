import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const bundlePath = resolve("plugins/exfu-multiaccount/server/index.mjs");

interface JsonRpcResponse {
  id?: number;
  result?: { tools?: Array<{ name?: string }> };
  error?: unknown;
}

describe("plugin bundle", () => {
  if (!existsSync(bundlePath)) {
    it.skip("serves the complete MCP tool list over stdio", () => undefined);
    return;
  }

  it(
    "serves the complete MCP tool list over stdio",
    async () => {
      const home = await mkdtemp(join(tmpdir(), "exfu-bundle-"));
      const child = spawn(process.execPath, [bundlePath], {
        env: { ...process.env, EXFU_MULTIACCOUNT_HOME: home },
        stdio: ["pipe", "pipe", "pipe"],
      });
      child.stdout.setEncoding("utf8");
      child.stderr.setEncoding("utf8");
      let stdoutBuffer = "";
      let stderr = "";
      const pending = new Map<
        number,
        { resolve: (message: JsonRpcResponse) => void; reject: (error: Error) => void }
      >();

      const rejectPending = (error: Error) => {
        for (const { reject } of pending.values()) {
          reject(error);
        }
        pending.clear();
      };

      child.stderr.on("data", (chunk: string) => {
        stderr += chunk;
      });
      child.stdout.on("data", (chunk: string) => {
        stdoutBuffer += chunk;
        const lines = stdoutBuffer.split("\n");
        stdoutBuffer = lines.pop() ?? "";
        try {
          for (const line of lines.filter(Boolean)) {
            const message = JSON.parse(line) as JsonRpcResponse;
            if (message.id !== undefined) {
              pending.get(message.id)?.resolve(message);
              pending.delete(message.id);
            }
          }
        } catch (error) {
          rejectPending(error instanceof Error ? error : new Error(String(error)));
        }
      });
      child.on("error", rejectPending);
      child.on("exit", (code) => {
        if (pending.size) {
          rejectPending(
            new Error(`Bundle exited with code ${String(code)} before responding. ${stderr}`),
          );
        }
      });

      const request = (id: number, method: string, params?: unknown) => {
        const response = new Promise<JsonRpcResponse>((resolveResponse, reject) => {
          pending.set(id, { resolve: resolveResponse, reject });
        });
        child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
        return response;
      };

      try {
        const initialized = await request(1, "initialize", {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "bundle-test", version: "1.0.0" },
        });
        expect(initialized.error).toBeUndefined();
        child.stdin.write(
          `${JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" })}\n`,
        );

        const listed = await request(2, "tools/list", {});
        expect(listed.error).toBeUndefined();
        const names = listed.result?.tools?.map(({ name }) => name) ?? [];
        expect(names).toHaveLength(19);
        expect(names).toContain("gmail_get_attachment");
      } finally {
        child.stdin.end();
        child.kill();
        await rm(home, { recursive: true, force: true });
      }
    },
    20_000,
  );
});
