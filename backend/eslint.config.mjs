import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // 1. Ignore compiled output and dependencies
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".agents/",
      ".claude/",
      ".cursor/",
      ".devin/",
      "src/prisma/contract.d.ts",
    ],
  },
  // 2. Apply recommended base JavaScript and TypeScript rules
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // 3. Configure Node.js environment and custom rules
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "off",
    },
  },
);
