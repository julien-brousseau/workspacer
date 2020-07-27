<template>
  <div id="ws-menu">

    <div v-if="addingWS" class="ui form">
      <input type="text" v-model="ws.name">
      <button @click="createWS" class="ui green button">Create</button>
      <button @click="toggleAddingWS" class="ui button">Cancel</button>
    </div>

    <button v-else @click="toggleAddingWS" class="ui primary button">New Workspace</button>

    <button @click="false" class="ui tiny teal button">Save current window</button>
    <button @click="clearWS" class="ui tiny red button">Reset</button>

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
    ...mapActions(['addWS', 'toggleAddingWS', 'clearWS']),
    createWS () {
      this.addWS(this.ws)
      this.ws = baseWS
      this.toggleAddingWS() // working??
    }
  }
}
</script>

<style scoped>

</style>
