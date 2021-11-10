module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
    'eqeqeq': ['warn'],

    'no-console': ['warn'],
    'no-duplicate-imports': ['warn'],
    'prefer-const': ['warn'],

    'react/prop-types': 'off',
    'react/display-name': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': ['warn'],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-empty-interface': ['warn'],
    '@typescript-eslint/no-var-requires': ['warn'],
    '@typescript-eslint/ban-types': ['warn'],
    '@typescript-eslint/ban-ts-comment': 'off',

    'jsx-a11y/accessible-emoji': ['warn'],
    'jsx-a11y/label-has-associated-control': ['warn'],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    'jsx-a11y/no-noninteractive-element-interactions': ['warn'],
    'jsx-a11y/mouse-events-have-key-events': ['warn'],
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',

    'unused-imports/no-unused-imports': 'warn',
  },
};
