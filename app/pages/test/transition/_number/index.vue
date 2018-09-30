<script>
export default {
  'computed': {
    num () {
      return parseInt(this.$route.params.number || 1, 10)
    },
    images () {
      return [
        'https://via.placeholder.com/350x150',
        'https://via.placeholder.com/350x150',
        'https://via.placeholder.com/350x150',
        'https://via.placeholder.com/350x150',
      ]
    },
  },
  'methods': {
    move (target) {
      this.$router.push(`/test/transition/${target}`)
    },
  },
}
</script>

<template lang="pug">
  .route-root
    h1 {{num}}

    v-container
      v-layout(row, wrap)
        v-flex(xs6, v-for="(url, index) in images", :key="index")
          img(:src="url")

    v-bottom-nav(
      :value="true"
      absolute
      color="transparent"
    )
      v-btn(value="minus", @click="move(num - 1)")
        h3 {{num - 1}} <-
      v-btn(value="plus", @click="move(num + 1)")
        h3 -> {{num + 1}}
</template>
