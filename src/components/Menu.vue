<template>
  <div id="ws-menu">

    <button @click="loadWS" class="ui primary large button">Load WS</button>
    <button @click="addWS(ws)" class="ui warning large button">Add WS</button>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      ws: [
        { 'Brousseau.tech': [{ url: 'codingisfun.comm', index: 1, pinned: true }, { url: 'blopblolp.comm', index: 0, pinned: false }] },
        { Personal: [{ url: 'somepornsite.comm', index: 0 }] }
      ]
    }
  },
  methods: {
    ...mapActions(['addWS', 'loadWS'])
  }
}
</script>

<style scoped>

</style>
