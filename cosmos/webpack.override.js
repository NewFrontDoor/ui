module.exports = webpackConfig => {
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
