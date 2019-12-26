module.exports = {
  root: true,
  env: {
    node: false
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  rules: {
    "no-unused-vars":0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  "globals":{
  "require": true
}
}
