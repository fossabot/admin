export const state = () => ({
  'show':     true,
  'collapse': false,
})

export const mutations = {
  show (state) {
    state.show = true
  },

  hide (state) {
    state.show = false
  },

  collapse (state) {
    state.collapse = true
  },

  expand (state, force) {
    if (!state.show && !force) {
      state.show = true
    } else {
      state.collapse = false
    }
  },
}

export const getters = {
  shown (state) {
    return state.show
  },

  collapsed (state) {
    return state.collapse
  },
}
