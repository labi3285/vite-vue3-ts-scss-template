module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint',
    // 'plugin:prettier/recommended',
  ],
  rules: {
    /* 未使用的变量 */
    '@typescript-eslint/no-unused-vars': 'off',
    /* 使用any */
    '@typescript-eslint/no-explicit-any': 'off',
    /* requires */
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    /* ignore */
    '@typescript-eslint/ban-ts-comment': 'off',

    /* 单引号 */
    'quotes': ['warn', 'single'],

    /* html元素封闭元素需要换行 */
    'vue/singleline-html-element-content-newline': 'off',
    /* 一行最多的变量数 */
    'vue/max-attributes-per-line': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-unused-components': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 'off',

    /* 结尾的分号 */
    'semi': 'warn',
    /* 分号前后空格 */
    'semi-spacing': ['warn', {'before': false, 'after': true}],

    /* 结尾的逗号 */
    'comma-dangle': ['warn', 'always-multiline'],
    /* 逗号前后空格限制 */
    'comma-spacing': ['warn', { 'before': false, 'after': true }],
    /* 逗号必须在末尾 */
    'comma-style': ['warn', 'last'],

    'space-before-blocks': ['warn', 'always'],

    /* []的前后不能有空格 */
    'array-bracket-spacing': ['warn', 'never'],

    /* if while function 后面的{必须与if在同一行 */
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],

    /* 关键词前后空格 */
    'keyword-spacing': 'warn',

    /* 使用严格模式 */
    'strict': 'error',

    
    

  },
};

