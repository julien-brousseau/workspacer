<template>
  <div id="ws-menu" class="ui top attached segment">

    <h1>Workspacer</h1>
    <button
      class="ui large green button"
      :class="{ disabled }"
      @click="toggleNewWS">
        Create new workspace
    </button>

    <button
      class="ui small basic red icon button btn-reset"
      @click="clearWS">
        <i class="trash icon"></i>Reset
    </button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['addingWS', 'editingWS']),
    disabled () { return this.addingWS || this.editingWS }
  },
  methods: {
    ...mapActions(['toggleAddingWS', 'clearWS']),
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
.btn-reset {
  /* margin: 26px 20px 0px 0px !important; */
}
</style>
