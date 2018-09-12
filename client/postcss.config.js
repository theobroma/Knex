module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
    require('postcss-flexbugs-fixes'),
    require('css-mqpacker')({
      sort: true
    }),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('postcss-fontpath')({
      checkFiles: true
    })
  ]
};
