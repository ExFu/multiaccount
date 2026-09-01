---
id: T3-m2-keychain-store
plan_kind: thematic
tier: 3
t2_parent: T2-core-server
milestone: M2-workspace-live
status: active
---

# T3 — encrypted token store with macOS Keychain key (M2 slice 2)

Implements `T2-core-server` §1 principle 2's deferred upgrade. Pattern
reference (per T1 §2): Softeria/ms-365-mcp-server — encrypted cache on
disk, only the key in the OS credential store.

## 1. Environment (pinned)

- Repo root `/Users/al/Studio/projects/exfu-multiaccount`, macOS
  (darwin), `/usr/bin/security` available. Node v25.9.0, npm 11.12.1.
- Builds on `T3-m2-drive-calendar` being merged; all tests green before
  starting.

## 2. Deliverable

1. **`src/accounts/keyProvider.ts`**: `KeyProvider` interface
   `{ getKey(): Promise<Buffer> }` (32 bytes). `MacKeychainKeyProvider`:
   reads via `/usr/bin/security find-generic-password -s exfu-multiaccount
   -a token-key -w` (hex-decoded); on "not found", generates 32 random
   bytes and stores with `add-generic-password -U -s exfu-multiaccount -a
   token-key -w <hex>`. Use `execFile` (never shell interpolation of the
   key); the key travels only via argv to `/usr/bin/security`, is never
   logged, and never written to disk unencrypted.
2. **`src/accounts/encryptedTokens.ts`**: `EncryptedFileTokenStore`
   implements the existing `TokenStore` interface. File
   `tokens/<alias>.json.enc`, mode 0600, format: 12-byte IV ‖ 16-byte GCM
   auth tag ‖ ciphertext (AES-256-GCM, key from the injected
   `KeyProvider`). Tamper/auth-tag failure → clear error naming the alias
   and advising re-auth (never dump ciphertext or key material).
   Migration: `get(alias)` finding no `.enc` but a plaintext
   `tokens/<alias>.json` encrypts it, writes `.enc`, deletes the
   plaintext, then proceeds.
3. **Factory**: `createTokenStore()` in `src/accounts/tokens.ts` (or a
   new `src/accounts/storeFactory.ts`): darwin → `EncryptedFileTokenStore`
   with `MacKeychainKeyProvider`; non-darwin or
   `EXFU_MULTIACCOUNT_PLAIN_TOKENS=1` → `FileTokenStore`. Replace every
   direct `new FileTokenStore()` in `src/tools.ts` and
   `src/providers/google/auth.ts` defaults with the factory.
4. **Tests** (no real keychain: inject a stub `KeyProvider` with a fixed
   key): encrypt/decrypt round-trip; migration from plaintext (plaintext
   file gone afterwards, `.enc` present, content preserved); tamper
   detection (flip a ciphertext byte → the advisory error); factory
   honors `EXFU_MULTIACCOUNT_PLAIN_TOKENS=1`.
5. **README.md**: short "token security" section — where tokens live, how
   the key is stored, the plaintext escape hatch for non-mac platforms.

## 3. Commands (exact)

```
npm run build
npm test
```

## 4. Verification (pass criteria — run all)

1. `npm run build` exits 0.
2. `npm test` exits 0; every pre-existing test still green.
3. Stdio smoke: `initialize` handshake still answers (same command as
   T3-m1 §4.3), with `EXFU_MULTIACCOUNT_PLAIN_TOKENS=1` set so the smoke
   never touches the real keychain.

## 5. Out of scope (do not touch)

- No changes to tool surfaces or Google providers beyond swapping the
  token-store default; no Linux/Windows keychain backends (plaintext
  fallback is the v1 answer there); no re-encryption command.
- The real-keychain path is verified by the operator's M2 smoke, not by
  tests — never invoke `/usr/bin/security` from the test suite.
- Never modify: `.apv/`, `.apv-config.toml`, `planning/`, `CLAUDE.md`,
  `.claude/`, `.exfu/`, `docs/`, `.gitignore`.
- No `git commit`/`git push`/history-altering commands.
