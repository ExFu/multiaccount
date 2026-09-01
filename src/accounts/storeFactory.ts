import { EncryptedFileTokenStore } from "./encryptedTokens.js";
import { MacKeychainKeyProvider } from "./keyProvider.js";
import { FileTokenStore, type TokenStore } from "./tokens.js";

export function createTokenStore(): TokenStore {
  if (process.platform !== "darwin" || process.env.EXFU_MULTIACCOUNT_PLAIN_TOKENS === "1") {
    return new FileTokenStore();
  }
  return new EncryptedFileTokenStore(new MacKeychainKeyProvider());
}
