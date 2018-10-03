import createPersistedState from 'vuex-persistedstate'
import cookie from 'js-cookie'
import {struct,} from 'superstruct'

const createDynamicValidator = (object) => {
  const base = {}

  Object.keys(object).forEach((key) => {
    const item = object[key]

    base[key] = `${typeof item}?`
  })

  return struct.partial(base)
}

const normaliseStoreState = (state) => {
  // Object is a store module's state

  const result = {}

  Object.keys(state)
  .filter((key) => {
    return state[key] !== null
  })
  .forEach((key) => {
    const value = state[key]

    result[key] = value
  })

  return result
}

const serverStorage = ({req, store,}) => ({
  getItem (key) {
    /*
     * Before we render the app's current state based on the user's cookie,
     * we need to validate the it in case of a byte flip or a deliberate attack.
     */

    try {
      // This is Vuex's default store state
      /* eslint-disable-next-line no-underscore-dangle */
      const modulesNamespaceMap = store._modulesNamespaceMap

      const storeState = {}

      Object.keys(modulesNamespaceMap).map((ns) => {
        const initialState = modulesNamespaceMap[ns].state
        const validate = createDynamicValidator(initialState)
        const rawUserCookie = JSON.parse(req.cookies[key])
        const namespace = ns.slice(0, -1)
        const rawUserNamespace = rawUserCookie[namespace]
        const userNamespace = normaliseStoreState(rawUserNamespace)

        const userState = validate(userNamespace, initialState)

        storeState[namespace] = userState
      })

      return JSON.stringify(storeState)
    } catch (error) {
      return '{}'
    }
  },

  setItem () {
    return null
  },

  removeItem () {
    return null
  },
})

const browserStorage = () => ({
  getItem (key) {
    return cookie.get(key)
  },

  setItem (key, value) {
    return cookie.set(key, value)
  },

  removeItem (key) {
    return cookie.remove(key)
  },
})

export default ({store, req,}) => {
  const persistState = createPersistedState({
    'key':     'graphline-state',
    'storage': process.server
      ? serverStorage({req, store,})
      : browserStorage(),
  })

  return persistState(store)
}
