import cookie from 'js-cookie'
import {link as browserLink,} from './_browser-link'
import {link as serverLink,} from './_server-link'

export default ({req,}) => {
  return {
    'httpEndpoint':    process.env.API_HTTP,
    'wsEndpoint':      process.env.API_WS,
    'httpLinkOptions': {
      'credentials': 'same-origin',
    },

    'link': process.server
      ? serverLink()
      : browserLink(),

    getAuth (tokenName) {
      return process.server
        ? `Bearer ${req.cookies[tokenName]}`
        : `Bearer ${cookie.get(tokenName)}`
    },
  }
}
