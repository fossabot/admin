<script>
import navigationMenu from '~/components/core/navigation/menu'
import navigationBar from '~/components/core/navigation/bar'
import {mapGetters, mapMutations,} from 'vuex'

export default {
  'components': {
    navigationMenu,
    navigationBar,
  },
  'computed': mapGetters({
    'collapsed': 'sidebar/collapsed',
    'shown':     'sidebar/shown',
    'theme':     'theme/theme',
    'dark':      'theme/dark',
  }),
  'methods': {
    ...mapMutations({
      'show': 'sidebar/show',
      'hide': 'sidebar/hide',
    }),

    updateShown (show) {
      if (show) {
        return this.show()
      }

      return this.hide()
    },
  },
}
</script>

<template lang="pug">
v-app(id="graphline-layout-default", :theme="theme", :dark="dark")
  v-navigation-drawer(
    app
    :disable-route-watcher="true"
    :mini-variant="collapsed"
    :value="shown"
    @input="updateShown"
  )
    navigation-menu

  navigation-bar(:sidebar="shown")

  v-content
    v-container(fluid)
      nuxt
</template>
