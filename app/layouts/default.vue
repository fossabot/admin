<script>
import navigationMenu from '~/components/core/navigation/menu'
import navigationBar from '~/components/core/navigation/bar'

export default {
  'components': {
    navigationMenu,
    navigationBar,
  },
}
</script>

<template lang="pug">
v-app(id="graphline-layout-default")
  v-navigation-drawer(app)
    navigation-menu

  navigation-bar

  v-content
    v-container(fluid)
      nuxt
</template>
