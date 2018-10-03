<script>
import logoutMutation from './logout.gql'
import {mapMutations, mapGetters,} from 'vuex'

export default {
  'props': {
    'sidebar': {
      'type':    Boolean,
      'default': false,
    },
  },
  'computed': mapGetters({
    'collapsed': 'sidebar/collapsed',
    'dark':      'theme/dark',
  }),
  'methods': {
    ...mapMutations({
      'collapse':    'sidebar/collapse',
      'expand':      'sidebar/expand',
      'changeTheme': 'theme/change',
      'toggleDark':  'theme/toggle',
    }),
    async submitLogout () {
      await this.$apollo.mutate({
        'mutation': logoutMutation,
      })

      this.$apolloHelpers.onLogout()
      this.$router.push('/login')
    },
  },
}
</script>

<template lang="pug">
v-toolbar(app, dark, color="primary").is-brand-primary
  v-btn(
    fab
    flat
    small
    v-if="collapsed || !sidebar"
    @click="expand"
  )
    v-icon chevron_right
  v-btn(
    fab
    flat
    small
    v-else
    @click="collapse"
  )
    v-icon chevron_left

  v-spacer
  v-toolbar-title Graphline
  v-spacer

  v-toolbar-title(v-if="viewer")
    v-menu(offset-y, :close-on-content-click="false")
      v-btn(
        slot="activator"
        fab,
        depressed,
        small,
        aria-label="User context menu"
      )
        v-avatar(size="32")
          img(
            src='https://www.gravatar.com/avatar/?default=mp',
            :alt="viewer.display"
          )

      v-card
        v-list
          v-list-tile(avatar)
            v-list-tile-avatar
              img(src='https://www.gravatar.com/avatar/?default=mp', :alt="viewer.display")
            v-list-tile-content
              v-list-tile-title {{viewer.display}}
            v-list-tile-action
              v-spacer

        v-divider
        v-list
          v-list-tile(@click="toggleDark", ripple)
            v-list-tile-content
              | {{dark ? 'Light mode' : 'Dark mode'}}
          v-list-tile(@click="submitLogout", ripple)
            v-list-tile-content
              | Log out
</template>
