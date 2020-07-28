<template>
  <div id="app" class="ui">

    <ws-menu></ws-menu>
    <ws-new v-if="addingWS"></ws-new>
    <ws-list v-else></ws-list>

  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import WSList from './components/WSList.vue'
import WSNew from './components/WSNew.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    wsMenu: Menu,
    wsList: WSList,
    wsNew: WSNew
  },
  computed: {
    ...mapGetters(['addingWS'])
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
  height: auto;
  color: #333333;
  padding: 20px;
}
</style>
