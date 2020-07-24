<template>
  <div id="ws-menu">

    <div v-if="addingWS" class="ui form">
      <input type="text" v-model="ws.name">
      <button @click="createWS" class="ui primary button">Create Workspace</button>
    </div>

    <button v-else @click="clearWS" class="ui red button">Reset WS</button>

    <button @click="toggleAddingWS" class="ui primary button">{{ addingWS ? "Cancel" : "New Workspace" }}</button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const baseWS = { name: null }

export default {
  data () {
    return {
      ws: baseWS
      // { 'Brousseau.tech': [{ url: 'codingisfun.comm', index: 1, pinned: true }, { url: 'blopblolp.comm', index: 0, pinned: false }] },
      // { Personal: [{ url: 'somepornsite.comm', index: 0 }] }

    }
  },
  computed: {
    ...mapGetters(['addingWS'])
  },
  methods: {
    ...mapActions(['addWS', 'loadWS', 'toggleAddingWS', 'clearWS']),
    createWS () {
      this.addWS(this.ws)
      this.ws = baseWS
    }
  }
}
</script>

<style scoped>

</style>
