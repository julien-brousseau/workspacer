<template>
  <div id="ws-menu">

    <button @click="loadWS" class="ui primary large button">Menu button</button>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['loadWS'])
  }
}
</script>

<style scoped>

</style>
