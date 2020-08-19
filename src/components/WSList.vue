<template>
  <div id="ws-list">

    <!-- Section title and main controls -->
    <h2 class="ui teal">
      <button class="ui huge basic icon primary button" @click="toggleNewWS"><i class="plus icon"></i></button>
      My Workspaces
    </h2>

    <!-- Empty ws library -->
    <div v-if="!allWS.length" class="ui segment">
      You have no workspaces
    </div>

    <!-- Workspace list -->
    <div v-else class="ui items unstackable">
      <ws-list-item v-for="ws in allWS"
        :key="ws.id"
        :ws="ws">
      </ws-list-item>
    </div>

    <!-- Temporary clear database button -->
    <button class="ui small basic red icon button btn-reset right floated" @click="clearWS">
      <i class="trash icon"></i>
      Reset
    </button>

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
</style>
