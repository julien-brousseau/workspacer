<template>
  <div id="app" class="ui">

    <div v-if="loading" class="ui segment">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
      <p></p>
    </div>

    <div v-else>
      <ws-menu></ws-menu>
      <ws-new v-if="addingWS"></ws-new>
      <ws-list v-else></ws-list>
    </div>

  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import WSList from './components/WSList.vue'
import WSNew from './components/WSNew.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    wsMenu: Menu,
    wsList: WSList,
    wsNew: WSNew
  },
  computed: {
    ...mapGetters(['addingWS', 'allWS']),
    loading () { return !this.allWS }// || !this.allWS.length }
  },
  created () {
    this.$store.dispatch('initWS')
  }
}
</script>

<style scoped>
#app {
  border: 1px solid lightgray;
  width: 600px;
  height: 100%;
  max-height: 100%;
  color: #333333;
  padding: 20px;
}
</style>
