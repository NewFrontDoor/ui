module.exports = webpackConfig => {
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        ...webpackConfig.module.rules,
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: ['file-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  };
};
