<template>
  <div class="ui attached segment" style="padding-top: 40px">

    <button class="ui tiny red button right floated reset"
      @click="clearWS">
        Reset</button>

    <h2 @click="selected = null">
      All Workspaces</h2>

    <div v-if="!allWS.length" class="ui segment">You have no workspaces.</div>

    <div v-else class="ui segments">
      <ws-list-item v-for="ws in allWS"
        :key="ws.id"
        :ws="ws">
      </ws-list-item>
    </div>

  </div>
</template>

<script>
import WSListItem from './WSListItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    wsListItem: WSListItem
  },
  computed: {
    ...mapGetters(['allWS'])
  },
  methods: {
    ...mapActions(['clearWS'])
  }
}
</script>

<style scoped>
.reset {
  margin-top: 26px;
}
</style>
