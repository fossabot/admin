<script>
import entryQuery from './entry.gql'
import vueMce from '~/components/core/mce-editor'

export default {
  validate ({route,}) {
    return route.params.id
  },
  'components': {
    vueMce,
  },
  'apollo': {
    'entry': {
      'query':     entryQuery,
      'prefetch':  true,
      'variables': {
        'id': 'cjmqjyu4c00a90810815pe44g',
      },
    },
  },
  data () {
    return {
      'changed': false,
    }
  },
  async beforeRouteLeave (to, from, next) {
    return next()
  },
  'methods': {
    getHeight () {
      if (process.server) {
        return 403
      }

      return window.innerHeight - 263
    },
  },
}
</script>

<template lang="pug">
.route-root.is-paddingless
  v-toolbar(dark)
    v-badge(right, v-model="changed", color="error")
      v-tooltip(slot="badge", bottom)
        span(slot="activator") &nbsp;
        span Has unsaved changes
      h1 {{entry.display}}

    v-spacer

    v-btn(
      @click="changed = false"
      fab
      color="primary"
      small
    )
      v-icon save

  vue-mce(v-model="entry.content", :getHeight="getHeight", @input="changed = true")
</template>
