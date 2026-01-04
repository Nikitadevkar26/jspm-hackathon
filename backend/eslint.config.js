const globals = require("globals");
const pluginJs = require("@eslint/js");

module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.es2021
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off"
        }
    },
    pluginJs.configs.recommended,
];
