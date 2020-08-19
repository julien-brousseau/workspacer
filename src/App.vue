<template>
  <div id="app" class="ui">

    <ws-loading v-if="loading"></ws-loading>

    <div v-else>
      <!-- <ws-menu></ws-menu> -->

      <ws-details v-if="addingWS || editingWS"></ws-details>
      <ws-list v-else></ws-list>
    </div>

  </div>
</template>

<script>
// import Menu from './components/items/Menu.vue'
import WSList from './components/WSList.vue'
import WSDetails from './components/WSDetails.vue'
import Loading from './components/items/Loading.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    // wsMenu: Menu,
    wsList: WSList,
    wsDetails: WSDetails,
    wsLoading: Loading
  },
  computed: {
    ...mapGetters(['addingWS', 'editingWS', 'allWS', 'allTabs']),
    loading () { return this.allWS === null || this.allTabs === null }
  },
  mounted () {
    this.$store.dispatch('initWS')
  }
}
</script>

<style>
#app {
  /* border: 1px solid lightgray; */
  width: 800px !important;
  height: 800px !important;
  /* max-height: 100%; */
  color: #333333;
  padding: 20px;
  padding-bottom: 50px;
}
h1 {
  text-align: inherit;
}
h2 {
  margin-left: 10px !important;
  margin-bottom: 30px !important;
  margin-top: 15px !important;
}
h4 {
  margin: 0px !important;
}
</style>
