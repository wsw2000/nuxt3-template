/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    'tailwindcss/no-custom-classname': 'off',
  },
}
