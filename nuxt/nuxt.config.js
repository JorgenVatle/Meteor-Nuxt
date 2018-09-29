const pkg = require('./package');
const path = require('path');

/**
 * Resolve external module.
 *
 * @param context
 * @param request
 * @param callback
 * @returns {boolean|void|*}
 */
function resolveExternals(context, request, callback) {
  return resolveMeteor(request, callback) || callback();
}

/**
 * Resolves a Meteor module.
 *
 * @param request
 * @param callback
 * @returns {boolean}
 */
function resolveMeteor(request, callback) {
  const match = request.match(/^meteor\/(.+)$/);
  const pack = match && match[1];

  if (pack) {
    callback(null, 'Package["' + pack + '"]');
    return true;
  }
}

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/plugins/meteor-client',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy'
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: [
        'meteor-client'
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, context) {
      config.resolve.alias['api'] = path.join(__dirname, '../meteor/imports/api');
      config.externals = [resolveExternals];
    }
  }
};