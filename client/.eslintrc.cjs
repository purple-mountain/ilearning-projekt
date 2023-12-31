/* eslint-env node */

module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        "plugin:@tanstack/eslint-plugin-query/recommended",
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        "react/react-in-jsx-scope": "off",
        "indent": ["error", 4],
        "react/prop-types": 0
    },
}
