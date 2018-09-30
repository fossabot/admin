<script>
import viewerQuery from '~~/apollo/queries/viewer.gql'
import loginMutation from './login.gql'

export default {
  'layout': 'bare',
  'apollo': {
    'viewer': {
      'query': viewerQuery,
    },
  },
  async asyncData ({app, redirect,}) {
    const client = app.apolloProvider.defaultClient
    const {data,} = await client.query({'query': viewerQuery,})

    if (data && data.viewer) {
      return redirect(307, '/')
    }

    return {}
  },
  '$_veeValidate': {
    'validator': 'new',
  },
  data () {
    return {
      'email':    '',
      'password': '',
      'loading':  true,
      'error':    '',
    }
  },
  mounted () {
    this.loading = false
  },
  'methods': {
    async submitLogin () {
      this.loading = true

      try {
        const {data,} = await this.$apollo.mutate({
          'mutation':  loginMutation,
          'variables': {
            'email':    this.email,
            'password': this.password,
          },
        })

        if (!data.session) {
          throw new Error('Login unsuccessful')
        }

        this.$apolloHelpers.onLogin(data.session.token)
        this.clear()

        this.loading = false
        this.error = ''
        this.$router.push(this.$route.query.resource || '/')
      } catch (error) {
        this.error = error.message
      }

      this.loading = false
    },
    logout () {
      this.$apolloHelpers.onLogout()
    },
    clear () {
      this.email = ''
      this.password = ''
      this.$validator.reset()
    },
  },
}
</script>

<template lang="pug">
  .route-root
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4)
          form(@submit.prevent="submitLogin")
            v-card.elevation-8
              v-toolbar(dark, color="primary")
                h1(v-if="$route.query.resource")
                  | You must log in to access
                  |
                  b {{$route.query.resource}}
                h1(v-else)
                  | Please log in

              v-card-text
                v-text-field(
                  label="E-mail",
                  data-vv-name="e-mail"
                  v-model="email"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('e-mail')"
                  required
                  :disabled="loading"
                )
                v-text-field(
                  label="Password",
                  data-vv-name="password"
                  v-model="password",
                  type="password"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  required
                  :disabled="loading"
                )

              transition(name="page")
                v-alert(v-if="error", :value="true", type="error")
                  | {{error}}

              v-card-actions
                v-btn(type="submit", color="primary", :loading="loading")
                  | Log in
</template>
