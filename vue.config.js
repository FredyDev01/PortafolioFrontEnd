module.exports = {
  publicPath: process.env.PUBLIC_URL || "/",
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'FredyDev01 - Portafolio',
    },
  }
}