const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (storybookBaseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = defaultConfig.module.rules.filter(rule => !rule.test.test('test.css'));

  defaultConfig.plugins.push(
    new MiniCssExtractPlugin(),
  );

  defaultConfig.module.rules.push({
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        }
        // options: postCssOptions({ useSourceMaps: !!options.sourceMaps }),
      },
    ],
  });

  return defaultConfig;
}
