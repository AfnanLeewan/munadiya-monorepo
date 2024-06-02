module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules', 'dist', 'scripts'],
  rules: {
    'no-await-in-loop': 'off',
    'prettier/prettier': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    "import/extensions": ["error", "ignorePackages", { "ts": "never", "tsx": "never" }],
    "no-restricted-imports": [
      "error",
      {
        "name": "@mui/lab",
        "importNames": ["LoadingButton"],
        "message": "Please use LoadingButton from @/components/atoms/policy/LoadingButton to avoid app crashing when translating the page from browser"
      }
    ],
  },
}
