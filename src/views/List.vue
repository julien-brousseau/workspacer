<template>
  <div id="ws-list">

    <!-- Section title and main controls -->
    <h1>
      <button class="ui huge basic icon green button" @click="toggleNewWS"><i class="plus icon"></i></button>
      My Workspaces
    </h1>

    <!-- TODO: Add loading? -->

    <!-- Workspace list -->
    <div class="ui items unstackable">

      <div v-if="!allWS.length" class="item empty">
        You have no workspaces</div>

      <ws-list-item v-else v-for="ws in allWS"
        :key="ws.id"
        :ws="ws">
      </ws-list-item>

    </div>

    <!-- Temporary clear database button -->
    <button class="ui basic red icon button btn-reset right floated" style="margin-top: 40px" @click="clearWS"><i class="trash icon"></i></button>

  </div>
</template>

<script>
import WSListItem from '../components/WSListItem'
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
.items {
  margin: 0px;
}
.empty {
  padding: 25px 5px 15px 10px !important;
  margin: 0px !important;
}
</style>
