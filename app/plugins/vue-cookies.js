import Vue from 'vue'
import {set, get, remove,} from 'js-cookie'

Vue.mixin({
  'computed': {
    cookie () {
      return {
        set,
        get,
        remove,
      }
    },
  },
})
