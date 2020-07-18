<template>
  <div id="ws-menu">

    <button @click="changeBlop">Menu button</button>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['changeBlop'])
  }
}
</script>

<style scoped>

</style>
