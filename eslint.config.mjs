// @ts-check

import eslint from "@eslint/js";
import reactRecommended from "eslint-plugin-react/configs/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...reactRecommended,
    ignores: ["**/node_modules/", "./git"],
  }
);
