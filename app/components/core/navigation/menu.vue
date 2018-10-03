<script>
import {mapGetters,} from 'vuex'

const items = {
  '/': {
    'display': 'Dashboard',
    'icon':    'dashboard',
    'group':   'main',
  },
  '/entries': {
    'display': 'Entries',
    'icon':    'edit',
    'group':   'content',
  },
  '/slugs': {
    'display': 'Slugs',
    'icon':    'settings_ethernet',
    'group':   'content',
  },
  '/users': {
    'display': 'Users',
    'icon':    'account_box',
    'group':   'settings',
  },
  '/tools': {
    'display': 'Tools',
    'icon':    'build',
    'group':   'settings',
  },
  '/settings': {
    'display': 'Settings',
    'icon':    'settings',
    'group':   'settings',
  },
}

const groups = {
  'main': {
    'icon':    'home',
    'display': 'Main',
  },
  'content': {
    'icon':    'edit',
    'display': 'Content',
  },
  'settings': {
    'icon':    'settings',
    'display': 'Settings',
  },
}

export default {
  'computed': {
    ...mapGetters({
      'collapsed': 'sidebar/collapsed',
    }),
    groups () {
      return groups
    },
    menu () {
      const groupMap = {}

      Object.keys(groups).forEach((key) => {
        groupMap[key] = {}
      })

      Object.keys(items).forEach((key) => {
        const item = items[key]

        groupMap[item.group][key] = item
      })

      return groupMap
    },
  },
}
</script>

<style lang="scss" scoped>
  .navigation-menu {
    height: 100%;
  }
</style>

<template lang="pug">
  .navigation-menu
    v-list
      template(v-for="(items, group) in menu")
        v-subheader
          span {{groups[group].display}}
          v-spacer
          v-icon {{groups[group].icon}}
        v-divider

        v-list
          v-list-tile(
            v-for="(item, route) in items"
            :key="item.route"
            ripple
            nuxt
            :to="route"
          )
            v-list-tile-action
              v-icon {{item.icon}}
            v-list-tile-content
              | {{item.display}}
</template>
