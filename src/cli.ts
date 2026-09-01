#!/usr/bin/env node
import { accountsAdd, accountsList, accountsRemove } from "./tools.js";

function usage(): string {
  return [
    "Usage:",
    "  exfu-multiaccount add-account <alias> [--info \"text\"]",
    "  exfu-multiaccount list-accounts",
    "  exfu-multiaccount remove-account <alias>",
  ].join("\n");
}

async function main(args: string[]): Promise<void> {
  const [command, ...rest] = args;
  if (command === "list-accounts") {
    if (rest.length) {
      throw new Error(usage());
    }
    const accounts = await accountsList();
    console.log(JSON.stringify({ count: accounts.length, accounts }, null, 2));
    return;
  }

  if (command === "add-account") {
    const alias = rest[0];
    if (!alias) {
      throw new Error(usage());
    }
    let extraInfo: string | undefined;
    if (rest.length > 1) {
      if (rest[1] !== "--info" || !rest[2] || rest.length !== 3) {
        throw new Error(usage());
      }
      extraInfo = rest[2];
    }
    const account = await accountsAdd(alias, extraInfo);
    console.log(`Added ${account.alias} (${account.email}) with read-only Gmail access.`);
    return;
  }

  if (command === "remove-account") {
    const alias = rest[0];
    if (!alias || rest.length !== 1) {
      throw new Error(usage());
    }
    const removed = await accountsRemove(alias);
    console.log(removed ? `Removed account ${alias}.` : `Account ${alias} was not configured.`);
    return;
  }

  throw new Error(usage());
}

try {
  await main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : "Command failed.");
  process.exitCode = 1;
}
