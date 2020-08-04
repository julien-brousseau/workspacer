<template>
  <div id="ws-list" class="ui attached segment">

    <button class="ui right floated mini basic red icon button reset" @click="clearWS"><i class="trash icon"></i>Reset</button>
    <h2 @click="selected = null">My Workspaces</h2>

    <div v-if="!allWS.length" class="ui segment">You have no workspaces.</div>

    <div v-else class="ui items unstackable">
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
#ws-list {
  padding: 10px 0px 0px 0px;
}
h2 {
  margin-left: 10px !important;
  margin-bottom: 40px !important;
}
.reset {
  margin: 26px 20px 0px 0px !important;
}
</style>
