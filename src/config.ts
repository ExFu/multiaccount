import { chmod, mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { isAbsolute, join, resolve } from "node:path";

export interface ExfuConfig {
  googleClientSecretPath: string;
}

export async function resolveHome(): Promise<string> {
  const override = process.env.EXFU_MULTIACCOUNT_HOME?.trim();
  const home = override ? resolve(override) : join(homedir(), ".exfu-multiaccount");

  await mkdir(join(home, "tokens"), { recursive: true, mode: 0o700 });
  await Promise.all([
    chmod(home, 0o700),
    chmod(join(home, "tokens"), 0o700),
  ]);

  return home;
}

export async function loadConfig(): Promise<ExfuConfig> {
  const home = await resolveHome();
  const configPath = join(home, "config.json");
  let parsed: unknown;

  try {
    parsed = JSON.parse(await readFile(configPath, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(`Missing config file at ${configPath}.`);
    }
    throw new Error(`Could not read config file at ${configPath}.`);
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as Record<string, unknown>).googleClientSecretPath !== "string" ||
    !(parsed as Record<string, string>).googleClientSecretPath.trim()
  ) {
    throw new Error("config.json must contain a non-empty googleClientSecretPath string.");
  }

  const configuredPath = (parsed as Record<string, string>).googleClientSecretPath.trim();
  return {
    googleClientSecretPath: isAbsolute(configuredPath)
      ? configuredPath
      : resolve(home, configuredPath),
  };
}
