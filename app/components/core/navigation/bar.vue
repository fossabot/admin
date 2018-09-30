<script>
import logoutMutation from './logout.gql'

export default {
  'methods': {
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
          v-list-tile(@click="submitLogout", ripple)
            v-list-tile-content
              | Log out
</template>
