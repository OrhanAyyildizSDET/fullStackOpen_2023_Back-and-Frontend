module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true,
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
  },
  "parserOptions": {
    "ecmaVersion": 2018,
  },
  "rules": {
    "keyword-spacing": [
      "error",
      { "before": true, "after": true },
    ],
    "indent": [
      "error",
      2,
    ],
    "quotes": [
      "error",
      "double",
    ],
    "semi": [
      "error",
      "always",
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always",
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true },
    ],
    "space-infix-ops": [
      "error",
    ],
    "comma-spacing": [
      "error",
      { "before": false, "after": true },
    ],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-blocks": "error",
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "no-console": 0,
    "max-len": ["error", { "code": 120, "ignoreComments": true }],
    "no-multiple-empty-lines": ["error", { max: 2 }],
    "eol-last": ["error", "always"],
  },
};
