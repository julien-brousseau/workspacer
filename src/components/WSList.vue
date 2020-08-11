<template>
  <div id="ws-list" class="ui attached segment">

    <h2>
      My Workspaces
      <button class="ui large green button right floated" style="margin:10px;" @click="toggleNewWS">Create new workspace</button>
      <!-- <button class="ui small basic red icon button btn-reset right floated" @click="clearWS"><i class="trash icon"></i>Reset</button> -->
    </h2>

    <div v-if="!allWS.length" class="ui segment">
      You have no workspaces.</div>

    <div v-else class="ui items unstackable">

      <div v-if="!allWS.length" class="ui segment">
        This workspace contains no tabs</div>

      <ws-list-item v-else v-for="ws in allWS"
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
    ...mapActions(['toggleAddingWS', 'clearWS']),
    toggleNewWS () { this.toggleAddingWS(true) }
  }
}
</script>

<style scoped>
#ws-list {
  padding: 10px 0px 0px 0px;
}
</style>
