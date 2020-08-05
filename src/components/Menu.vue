<template>
  <div id="ws-menu" class="ui top attached segment">

    <h1>Workspacer</h1>

    <div class="ui buttons">
      <button
        class="ui large primary button"
        :class="{ disabled }"
        @click="showForm(true)">
          Save current window as workspace</button>

      <div class="or"></div>

      <button
        class="ui large button"
        :class="{ disabled }"
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
    ...mapGetters(['addingWS']),
    disabled () {
      return this.addingWS
    }
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
#ws-menu {
  text-align: center;
  padding-bottom: 25px !important;
}
</style>
