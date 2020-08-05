<template>
  <div id="ws-menu" class="ui top attached segment">

    <h1>Workspacer</h1>
    <button
      class="ui large button"
      :class="{ disabled }"
      @click="toggleNewWS">
        Create new workspace
    </button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['addingWS']),
    disabled () { return this.addingWS }
  },
  methods: {
    ...mapActions(['toggleAddingWS']),
    toggleNewWS () {
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
