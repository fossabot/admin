import {log,} from 'lib/logger'
import cookieParser from 'cookie-parser'

export default async ({app, server,}) => {
  log.debug('applying cookie-parser middleware')
  app.use((req, res, next) => {
    req.headers.cookie = req.headers.cookie || req.headers['x-cookie']

    return next()
  })
  app.use(cookieParser())
}
