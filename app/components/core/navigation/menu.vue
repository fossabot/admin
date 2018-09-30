<script>
export default {
  'computed': {
    items () {
      return [
        {
          'route':   '/',
          'display': 'Dashboard',
          'icon':    'dashboard',
        },
        {
          'route':   '/entries',
          'display': 'Entries',
          'icon':    'edit',
        },
        {
          'route':   '/users',
          'display': 'Users',
          'icon':    'account_box',
        },
        {
          'route':   '/tools',
          'display': 'Tools',
          'icon':    'build',
        },
        {
          'route':   '/settings',
          'display': 'Settings',
          'icon':    'settings',
        },
      ]
    },
  },
}
</script>

<template lang="pug">
  .navigation-menu
    v-list
      v-list-tile(
        v-for="item in items",
        :key="item.route",
        ripple,
        @click="$router.push(item.route)"
      )
        v-list-tile-action
          v-icon {{item.icon}}
        v-list-tile-content
          | {{item.display}}
</template>
