<script>
import viewerQuery from '~~/apollo/queries/viewer.gql'

export default {
  'apollo': {
    'viewer': {
      'query':    viewerQuery,
      'prefetch': true,
    },
  },
}
</script>

<style lang="scss" scoped>
code {
  padding-bottom: 1rem;
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>

<template lang="pug">
  .route-root
    v-container(fill-height)
      v-layout(column)
        h1 Welcome, {{viewer.display}}
        br
        v-divider
        br

        .viewer-details
          | You registered {{viewer.createdAt | moment('from', 'now')}}.
          br
          | You have {{viewer.sessions.length}} currently open session(s):

          ul
            li(v-for="session in viewer.sessions")
              | {{session.createdAt | moment('from', 'now')}} - {{session.ua}}

        v-spacer
        pre
          code {{JSON.stringify(viewer)}}
</template>
