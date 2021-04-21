module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'warn',
    'no-alert': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
