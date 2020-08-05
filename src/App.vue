<template>
  <div id="app" class="ui">

    <ws-loading v-if="loading"></ws-loading>

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
import Loading from './components/items/Loading.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    wsMenu: Menu,
    wsList: WSList,
    wsNew: WSNew,
    wsLoading: Loading
  },
  computed: {
    ...mapGetters(['addingWS', 'allWS']),
    loading () { return this.allWS === null }
  },
  mounted () {
    this.$store.dispatch('initWS')
  }
}
</script>

<style>
#app {
  /* border: 1px solid lightgray; */
  width: 800px;
  /* height: 100%; */
  /* max-height: 100%; */
  color: #333333;
  padding: 20px;
}
h1 {
  text-align: inherit;
}
h2 {
  margin-left: 10px !important;
  margin-bottom: 40px !important;
}
h4 {
  margin: 0px !important;
}
</style>
