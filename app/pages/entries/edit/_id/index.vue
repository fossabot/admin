<script>
import entryQuery from './entry.gql'
import updateEntryMutation from './update-entry.gql'
import vueMce from '~/components/core/mce-editor'

export default {
  validate ({route,}) {
    return route.params.id
  },
  'components': {
    vueMce,
  },
  async asyncData ({error, app, params,}) {
    const {data,} = await app.apolloProvider.defaultClient.query({
      'query':     entryQuery,
      'variables': {
        'id': params.id,
      },
    })

    if (!data.entry) {
      return error({
        'statusCode': 404,
        'message':    'Entry not found',
      })
    }

    return {
      'entry': data.entry,
    }
  },
  data () {
    return {
      'saving':  false,
      'changed': false,
      'leaving': false,
    }
  },
  beforeRouteLeave (to, from, next) {
    this.leaving = true
    const wait = new Promise((resolve) => setTimeout(resolve, 150))

    return wait.then(next)
  },
  'methods': {
    getHeight () {
      if (process.server) {
        return 403
      }

      return window.innerHeight - 263
    },
    async saveEntry () {
      this.saving = true

      try {
        await this.$apollo.mutate({
          'mutation':  updateEntryMutation,
          'variables': {
            'data': {
              'id':        this.entry.id,
              'display':   this.entry.display,
              'content':   this.entry.content,
              'published': true,
            },
          },
        })
      } catch (error) {
        this.saving = false
        this.changed = true
        return null
      }

      this.saving = false
      this.changed = false
    },
  },
}
</script>

<template lang="pug">
.route-root.is-paddingless
  v-toolbar(dark)
    h1 {{entry.display}}

    v-spacer

    transition(name="zoom")
      v-btn(
        v-show="changed"
        @click="saveEntry"
        fab
        color="primary"
        small
        :loading="saving"
      )
        v-icon save

  transition(name="fade")
    vue-mce(
      v-show="!leaving"
      v-model="entry.content",
      :getHeight="getHeight",
      @input="changed = true"
    )
</template>
