module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-proposal-class-properties', 'inline-react-svg'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
};
