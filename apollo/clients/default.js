import cookie from 'js-cookie'

export default ({req,}) => {
  return {
    'httpEndpoint':    process.env.API_HTTP,
    // 'wsEndpoint':      process.env.API_WS,
    'httpLinkOptions': {
      'credentials': 'same-origin',
    },

    getAuth (tokenName) {
      if (process.server) {
        return `Bearer ${req.cookies[tokenName]}`
      }

      return `Bearer ${cookie.get(tokenName)}`
    },
  }
}
