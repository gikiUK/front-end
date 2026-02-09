import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,

  globalIgnores([".next/**", ".open-next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
