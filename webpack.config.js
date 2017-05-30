var path = require('path')

module.exports = {
  entry: './scripts/scripts.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
