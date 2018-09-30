import Vue from 'vue'
import viewerQuery from '~~/apollo/queries/viewer.gql'

Vue.mixin({
  'apollo': {
    'viewer': {
      'query': viewerQuery,
    },
  },
  async asyncData ({app, redirect, route,}) {
    const client = app.apolloProvider.defaultClient
    const {data,} = await client.query({'query': viewerQuery,})

    if (data && data.viewer) {
      return {
        'viewer': data.viewer,
      }
    }

    return redirect(307, '/login', {
      'resource': route.path,
    })
  },
})
