const fs = require('fs')

function createListOfNews() {
  let dir = 'static/news/'
  let filename = 'list.json'
  let newsList = [];

  try {
    fs.unlinkFileSync(dir + filename)
  } catch (err) {
    // handle the error
  }

  try {
    newsList = fs.readdirSync(dir)
  }  catch (err) {
    // handle the error
  }

  fs.writeFileSync(dir + filename, JSON.stringify(newsList), (err) => {
    if(err) {
      return console.error(err);
    }

    console.log('The news JSON file list was created successfully!')
  })
}

module.exports = function netlifyNewsList(options) {
  // Combine options
  const moduleOptions = Object.assign({}, this.options.netlifyNewsList, options)

  // Add hook for build
  this.nuxt.hook('build:before', async (renderer, renderOptions) => {
    // This will be called once before building
    await createListOfNews()
  })

  // Add hook for generate
  this.nuxt.hook('generate:before', async (generator, generateOptions) => {
    // This will be called once before generating the distribution pack
    await createListOfNews()
  })
}

module.exports.meta = require('../package.json')
