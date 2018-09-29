import assert from 'assert'

export const state = () => ({
  'viewer': null,
})

export const mutations = {
  login (state, viewer) {
    assert(typeof viewer === 'object', 'Viewer must be an object')
    assert(typeof viewer.id === 'string', 'Viewer must have an ID')

    state.viewer = viewer
  },

  logout (state) {
    state.viewer = null
  },
}

export const getters = {
  viewer (state) {
    return state.viewer
  },
}
