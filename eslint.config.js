const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: [
            "test/",
            ".github/"
        ]
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.es2021
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            indent: [
                "warn",
                4
            ],
            semi: [
                "error",
                "always"
            ]
        }
    }
];