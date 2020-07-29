<template>
  <div id="ws-menu" class="ui top attached segment">

    <h1>Workspacer</h1>

    <div v-if="!addingWS" class="ui buttons">
      <button
        class="ui primary button"
        @click="showForm(true)">
          Save current window</button>
      <div class="or"></div>
      <button
        class="ui button"
        @click="showForm(false)">
          Create new workspace</button>
    </div>

    <!-- <button @click="clearWS" class="ui tiny red button">Reset</button> -->

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['addingWS', 'showTabs'])
  },
  methods: {
    ...mapActions(['createTempWS', 'clearWS']),
    showForm (showTabs = false) {
      this.createTempWS(showTabs)
    }
  }
}
</script>

<style scoped>

</style>
