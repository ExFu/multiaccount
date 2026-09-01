import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    cache: false,
    environment: "node",
    clearMocks: true,
    restoreMocks: true,
  },
});
