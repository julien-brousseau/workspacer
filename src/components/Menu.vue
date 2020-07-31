<template>
  <div id="ws-menu" class="ui top attached segment">

    <h1 style="text-align: center">Workspacer</h1>

    <div v-if="!addingWS" class="ui buttons">
      <button
        class="ui primary button"
        @click="showForm(true)">
          Save current window</button>
      <div class="or"></div>
      <button
        class="ui button"
        @click="showForm(false)">
          Create empty workspace</button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    // TODO: Useless?
    ...mapGetters(['addingWS'])
  },
  methods: {
    ...mapActions(['toggleShowTabs', 'toggleAddingWS']),
    showForm (showTabs = false) {
      this.toggleShowTabs(showTabs)
      this.toggleAddingWS(true)
    }
  }
}
</script>

<style scoped>
.top {
  text-align: center;
  padding-bottom: 40px;
}
</style>
