import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FileTokenStore } from "../src/accounts/tokens.js";

let home: string;
let store: FileTokenStore;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-tokens-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  store = new FileTokenStore();
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("FileTokenStore", () => {
  it("writes mode 0600 and round-trips credentials", async () => {
    const tokens = { access_token: "access-secret", refresh_token: "refresh-secret" };
    await store.set("work", tokens);
    expect(await store.get("work")).toEqual(tokens);
    expect((await stat(join(home, "tokens", "work.json"))).mode & 0o777).toBe(0o600);
  });

  it("deletes credentials", async () => {
    await store.set("work", { access_token: "secret" });
    await store.delete("work");
    expect(await store.get("work")).toBeNull();
  });

  it("returns null for a missing alias", async () => {
    expect(await store.get("missing")).toBeNull();
  });
});
