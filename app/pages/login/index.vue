<script>
import viewerQuery from './viewer.gql'
import loginMutation from './login.gql'

export default {
  'apollo': {
    'viewer': {
      'query': viewerQuery,
    },
  },
  data () {
    return {
      'email':    '',
      'password': '',
    }
  },
  'methods': {
    async submitLogin () {
      const {data,} = await this.$apollo.mutate({
        'mutation':  loginMutation,
        'variables': {
          'email':    this.email,
          'password': this.password,
        },
      })

      this.$apolloHelpers.onLogin(data.session.token)
    },
    submitLogout () {
      this.$apolloHelpers.onLogout()
    },
  },
}
</script>

<template lang="pug">
  .route-root
    h1 Test
    p Viewer: {{viewer}}
    v-btn Hello!

    v-layout(wrap)
      v-container
        v-flex(xs12)
          form(@submit.prevent="submitLogin")
            v-text-field(placeholder="E-mail", v-model="email")
            v-text-field(placeholder="Password", v-model="password", type="password")

            v-btn(type="submit") Log in
          v-btn(@click="submitLogout") Log out
</template>
