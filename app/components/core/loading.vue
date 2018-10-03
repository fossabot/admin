<script>
export default {
  data () {
    return {
      'loading':     false,
      'failed':      false,
      'sidebarPrev': {
        'shown':    false,
        'expanded': false,
      },
    }
  },
  'methods': {
    reset () {
      this.loading = false
      this.failed = false
    },
    start () {
      this.loading = true
    },
    finish () {
      this.reset()
    },
    fail () {
      this.reset()
      this.failed = true
    },
  },
}
</script>

<style lang="scss" scoped>
  .v-progress-linear {
    z-index: 3;
    margin: 0;
    position: absolute;
  }
</style>

<template lang="pug">
  v-progress-linear(indeterminate, v-if="loading", color="accent", height="64")
</template>
