module.exports = {
  extends: '@newfrontdoor/tools/babel.config',
  env: {
    production: {
      plugins: [['emotion', {hoist: true}]]
    },
    development: {
      plugins: [['emotion', {sourceMap: true, autoLabel: true}]]
    }
  }
};
