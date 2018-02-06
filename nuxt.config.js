module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'tothepoint-captive',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Captive Portal for AdvancedTomato based on Nuxt and Netlify', hid: 'description' }
    ],
    script: [
      { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
    ],
    link: [
      { rel: 'icon',       href: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans|Material+Icons' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/app.styl',
    '~/assets/css/main.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    [
      '@nuxtjs/markdownit',
      '@nuxtjs/axios'
    ]
  ],
  plugins: [
    '~/plugins/vuetify.js'
  ],
  markdownit: {
    injected: true
  }
}
