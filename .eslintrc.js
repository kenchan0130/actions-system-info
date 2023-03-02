module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: [
    "@typescript-eslint",
    "vitest",
    "simple-import-sort",
    "prettier"
  ],
  env: {
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.eslint.json"]
  },
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
};
