import {onError,} from 'apollo-link-error'
import {RetryLink,} from 'apollo-link-retry'
import {from,} from 'apollo-link'

const errorLink = onError(({graphQLErrors, networkError, response = {},}) => {
  if (networkError) {
    response.errors = null
  }
})

const retryLink = new RetryLink({
  'delay': {
    'initial': 500,
    'max':     5000,
    'jitter':  true,
  },
  'attempts': {
    'max':     Infinity,
    'retryIf': (error) => !error,
  },
})

export const link = from([
  errorLink,
  retryLink,
])
