#!/usr/bin/env node
// Re-authorize stored Google accounts after refresh tokens expire
// (expected weekly while the OAuth app is in Google "testing" mode).
// Usage:
//   node scripts/reauth.mjs            # all accounts, one browser flow each
//   node scripts/reauth.mjs <alias>    # just that account
import { loadAccounts } from "../dist/accounts/registry.js";
import { FileTokenStore } from "../dist/accounts/tokens.js";
import { authorizeGoogleAccount } from "../dist/providers/google/auth.js";
import { getProfileEmail } from "../dist/providers/google/gmail.js";

const target = process.argv[2];
const accounts = await loadAccounts();
const selected =
  target && target !== "all"
    ? accounts.filter((account) => account.alias === target)
    : accounts;

if (!selected.length) {
  console.error(
    target
      ? `No account with alias "${target}". Run list-accounts to see aliases.`
      : "No accounts configured. Run add-account first.",
  );
  process.exit(1);
}

const tokenStore = new FileTokenStore();
let failures = 0;

for (const { alias, email } of selected) {
  console.log(`\nRe-authorizing "${alias}" — sign in as ${email} in the browser...`);
  try {
    const client = await authorizeGoogleAccount(alias);
    const actual = await getProfileEmail(client);
    if (actual.toLowerCase() !== email.toLowerCase()) {
      await tokenStore.delete(alias);
      throw new Error(
        `You signed in as ${actual}, but "${alias}" is registered to ${email}. ` +
          "Tokens discarded — run again and pick the right Google account.",
      );
    }
    console.log(`  OK: ${alias} (${actual}) re-authorized.`);
  } catch (error) {
    failures++;
    console.error(`  FAILED: ${error instanceof Error ? error.message : error}`);
  }
}

if (failures) {
  console.error(`\n${failures} account(s) failed — re-run for those aliases.`);
  process.exit(1);
}
console.log("\nAll selected accounts re-authorized.");
