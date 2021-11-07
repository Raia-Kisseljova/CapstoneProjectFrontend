module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  printWidth: 90,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  quoteProps: 'consistent',
  importOrder: [
    '^react(-?[a-z0-9/\\w*])*$',
    '^(api|components|hooks|styles|types|utils)/?(.*)$',
    '^[.][.]?([a-zA-Z0-9-/.-\\[\\]]*)$',
  ],
  importOrderSeparation: true,
};
