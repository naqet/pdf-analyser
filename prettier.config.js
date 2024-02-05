/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: true,
};

export default config;
