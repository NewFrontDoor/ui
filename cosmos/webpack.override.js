module.exports = (webpackConfig, _env) => {
  return {
    ...webpackConfig,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
};
