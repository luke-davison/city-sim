var path = require('path')

module.exports = {
  entry: './scripts/scripts.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
