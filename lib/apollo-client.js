import {ApolloClient,} from 'apollo-client'
import {BatchHttpLink,} from 'apollo-link-batch-http'
import {RetryLink,} from 'apollo-link-retry'
import {from,} from 'apollo-link'
import nodeFetch from 'node-fetch'
import pkg from '~~/package.json'

const batchLinkOptions = {
  'uri':           process.env.API,
  'batchInterval': 75,
}

if (process.server) {
  batchLinkOptions.fetch = nodeFetch
}

const httpLink = new BatchHttpLink(batchLinkOptions)

const authLink = (operation, forward) => {
  if (process.server) {
    return forward(operation)
  }
  const state = JSON.parse(window.localStorage.getItem(`graphline-state-${pkg.version}`))

  if (!state || !state.session || !state.session.session) {
    return forward(operation)
  }
  const {token,} = state.session.session

  operation.setContext((context) => ({
    ...context,
    'headers': {
      'Authorization': token,
    },
  }))

  return forward(operation)
}

const ssrUALink = (operation, forward) => {
  if (process.client) {
    return forward(operation)
  }

  operation.setContext((context) => ({
    ...context,
    'headers': {
      'user-agent': `graphline-ssr/${pkg.version} (+https://github.com/Graphline)`,
    },
  }))

  return forward(operation)
}

const retryLink = new RetryLink({
  'delay': {
    'initial': 350,
    'max':     1000,
    'jitter':  true,
  },
  'attempts': {
    'max':     10,
    'retryIf': (error, _operation) => Boolean(error),
  },
})

// Client building
const clientOptions = {
  'link': from([
    authLink,
    ssrUALink,
    retryLink,
    httpLink,
  ]),
  'connectToDevTools': false,
  'ssrMode':           process.server,
  'cache':             false,
}

export default new ApolloClient(clientOptions)
