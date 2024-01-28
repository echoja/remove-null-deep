/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";

import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ resolvePluginsRelativeTo: __dirname });

/** @type {Linter.FlatConfig[]} */
const config = [
  {
    ignores: ["**/*.test-d.ts"],
  },
  js.configs.recommended,
  // or translate an entire eslintrc style config!
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended-type-checked"],
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.eslint.json",
      tsconfigRootDir: __dirname,
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  }),
  {
    files: ["**/*.test-d.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

export default config;
