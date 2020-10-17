/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
      },

      fontFamily: {
        article: 'Lato, Helvetica Neue, Helvetica, sans-serif'
      }
    }
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  }
  variants: {},
  plugins: []
}
