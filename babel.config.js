module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ],
    '@emotion/babel-preset-css-prop'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-spread',
    '@babel/plugin-proposal-object-rest-spread',
    'inline-react-svg'
  ]
};
