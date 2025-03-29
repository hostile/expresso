import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
        "prefer-arrow-functions": preferArrowFunctions,
    },

    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "prettier/prettier": "error",
        "arrow-body-style": ["error", "always"],
        "no-unused-vars": "off",

        "prefer-arrow-functions/prefer-arrow-functions": ["warn", {
            allowNamedFunctions: false,
            classPropertiesAllowed: false,
            disallowPrototype: false,
            returnStyle: "unchanged",
            singleReturnOnly: false,
        }],

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "_*",
        }],
    },
}, {
    files: ["dist/**/*"],

    rules: {
        "*": "off",
    },
}];