import {RetryLink,} from 'apollo-link-retry'
import {from,} from 'apollo-link'

import pkg from '~~/package.json'

const uaLink = (operation, forward) => {
  operation.setContext((context) => {
    context.headers['user-agent'] = `graphline-ssr/${pkg.version} (+https://github.com/Graphline)`

    return context
  })

  return forward(operation)
}

const retryLink = new RetryLink({
  'delay': {
    'initial': 500,
    'max':     2000,
    'jitter':  true,
  },
  'attempts': {
    'max':     3,
    'retryIf': (error) => !error,
  },
})

export const link = from([
  uaLink,
  retryLink,
])
