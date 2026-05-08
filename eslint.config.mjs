import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import jestDom from "eslint-plugin-jest-dom";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

const sourceFiles = ["**/*.{js,jsx,ts,tsx}"];

const testFiles = [
  "**/*.{test,spec}.{js,jsx,ts,tsx}",
  "**/__tests__/**/*.{js,jsx,ts,tsx}"
];

export default defineConfig(
  globalIgnores([
    "**/dist/**",
    "**/coverage/**",
    "**/node_modules/**",
    "**/.pnpm/**",
    "**/.turbo/**",
    "**/.vite/**",
    "**/cosmos-export/**"
  ]),

  {
    files: sourceFiles,
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024
      }
    }
  },

  {
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" }
      ]
    }
  },

  {
    files: ["**/*.{js,jsx}"],
    extends: [tseslint.configs.disableTypeChecked]
  },

  {
    files: sourceFiles,
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"]
    ],
    settings: {
      react: {
        version: "detect"
      }
    },
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      "react/no-unknown-property": [
        "error",
        {
          ignore: ["sx"]
        }
      ],

      "react/jsx-pascal-case": "off",
      "react/boolean-prop-naming": "off",
      "react/jsx-no-useless-fragment": "off",
      "react/jsx-fragments": ["error", "element"]
    }
  },

  {
    files: testFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.jest
      }
    },
    extends: [
      testingLibrary.configs["flat/react"],
      jestDom.configs["flat/recommended"]
    ]
  },

  eslintConfigPrettier
);