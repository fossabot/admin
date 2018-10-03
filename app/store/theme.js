import assert from 'assert'

const styles = [
  'light',
  'dark',
]

export const state = () => ({
  'dark':  false,
  'theme': 'default',
})

export const mutations = {
  change (state, theme) {
    state.theme = theme
  },

  style (state, style) {
    assert(styles.includes(style), `style must be one of ${styles.join(', ')}, got ${style}`)

    state.dark = style === 'dark'
  },

  toggle (state) {
    state.dark = !state.dark
  },
}

export const getters = {
  dark (state) {
    return state.dark
  },

  theme (state) {
    return state.theme
  },
}
