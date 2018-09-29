import {log,} from 'lib/logger'
import cookieParser from 'cookie-parser'

import {Nuxt, Builder,} from 'nuxt'
import nuxtConfig from '@/nuxt.config'

let nuxt = new Nuxt({
  'dev':  nuxtConfig.dev,
  'head': nuxtConfig.head,
  'css':  nuxtConfig.css,
})

export default async ({app, server,}) => {
  log.debug('applying cookie-parser middleware')
  app.use((req, res, next) => {
    req.headers.cookie = req.headers.cookie || req.headers['x-cookie']

    return next()
  })

  app.use(cookieParser())

  if (process.env.NODE_ENV === 'development') {
    nuxt = new Nuxt(nuxtConfig)
    const builder = new Builder(nuxt)

    builder.build()
  }

  app.use(nuxt.render)
}

// import {Nuxt, Builder,} from 'nuxt-edge'
// import express from 'express'
// import nuxtConfig from '~/nuxt.config'
//
// const cacheOptions = {
//   'extensions': [
//     'html',
//     'htm',
//     'js',
//   ],
//   'index':  false,
//   'maxAge': '14d',
// }
//
// export default async ({app, config,}) => {
//
//
//   app.use('/sitemap.xml', sitemapHandler)
//   app.use(express.static('app/static', cacheOptions))
//
//   if (config.get('env') === 'development') {
//     nuxt = new Nuxt(nuxtConfig)
//     const builder = new Builder(nuxt)
//
//     builder.build()
//   }
//
//   app.use(nuxt.render)
// }
