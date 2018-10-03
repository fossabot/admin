// const nodeExternals = require('webpack-node-externals')

const rucksack = require('rucksack-css')
const willChange = require('postcss-will-change')
const willChangeTransition = require('postcss-will-change-transition')
const ellipsis = require('postcss-ellipsis')

const postcss = [
  // Syntax extending plugins
  rucksack({
    'autoprefixer':      false,
    'shorthandPosition': false,
    'quantityQueries':   false,
    'alias':             false,
    'inputPseudo':       false,
  }),
  ellipsis(),
  willChange(),
  willChangeTransition(),
]

module.exports = {
  // dev,
  'srcDir':  './app',
  'loading': '~/components/core/loading.vue',
  'head':    {
    'titleTemplate': 'Graphline Admin',
    'meta':          [
      {'charset': 'utf-8',},
      {'http-equiv': 'x-ua-compatible', 'content': 'ie=edge',},
      {'name': 'skype_toolbar', 'content': 'skype_toolbar_parser_compatible',},
      {'name': 'msapplication-tap-highlight', 'content': 'no',},
      {'name': 'renderer', 'content': 'webkit|ie-comp|ie-stand',},
      {'name': 'x5-page-mode', 'content': 'app',},
      {'name': 'browsermode', 'content': 'application',},
      {'name': 'wap-font-scale', 'content': 'no',},
      {'name': 'viewport', 'content': 'width=device-width, initial-scale=1, shrink-to-fit=no',},
      {'name': 'application-name', 'content': 'Graphline',},
      {'name': 'robots', 'content': 'index,follow',},
      {'name': 'format-detection', 'content': 'telephone=no',},
      {'name': 'mobile-web-capable', 'content': 'yes',},
    ],
    'link': [
      {'rel': 'license', 'href': '//github.com/Graphline/admin/LICENSE',},
    ],
  },
  'css': [
    '~~/assets/styl/main.styl',
    '~~/assets/scss/main.scss',
    'material-design-icons-iconfont/dist/material-design-icons.css',
  ],
  'build': {
    postcss,

    // extend (config, {isClient,}) {
    //   if (isClient) {
    //     config.externals = Object.assign({}, config.externals, nodeExternals({
    //       'whitelist': [
    //         /\.(eot|woff|woff2|ttf|otf)$/,
    //         /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
    //         /\.(mp4|mp3|ogg|swf|webp)$/,
    //         /\.(css|scss|sass|less|styl)$/,
    //       ],
    //     }))
    //   }
    //
    //   return config
    // },

    // 'extractCSS':   true,
    // 'optimization': {
    //   'splitChunks': {
    //     'name':        true,
    //     'cacheGroups': {
    //       'styles': {
    //         'name':    'styles',
    //         'test':    /\.(css|vue)$/,
    //         'chunks':  'all',
    //         'enforce': true,
    //       },
    //     },
    //   },
    // },
  },
  'env':     process.env,
  'plugins': [
    '~/plugins/vue-viewer.js',
    '~/plugins/vue-moment.js',
    '~/plugins/vue-markdown.js',
    '~/plugins/vue-filters.js',
    '~/plugins/vue-noscript.js',
    '~/plugins/vee-validate.js',
    '~/plugins/vuetify.js',
    '~/plugins/vuex-persistedstate.js',
    {
      'src': '~/plugins/vue-mce.js',
      'ssr': false,
    },
    {
      'src': '~/plugins/vue-cookies.js',
      'ssr': false,
    },
  ],
  'modules': [
    '@nuxtjs/apollo',
  ],
  'apollo': {
    'tokenName':     'graphline-session',
    'clientConfigs': {
      'default': '~~/apollo/clients/default.js',
    },
  },
}
