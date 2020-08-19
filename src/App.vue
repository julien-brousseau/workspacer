<template>
  <div id="app" class="ui">

    <ws-loading v-if="loading"></ws-loading>

    <div v-else class="content">
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
  min-width: 800px !important;
  height: 800px !important;
  /* max-height: 100%; */
  color: #333333;
  padding: 30px;
  margin: 0px;
  /* padding-bottom: 50px; */
}
/* .content {
  padding-left:20px
} */

/* Section title / nav */
h1 {
  border-bottom: 1px solid #CCCCCC;
  padding-bottom: 20px;
  margin-bottom: 0px !important;
}
h1 .button {
  margin-right: 12px !important;
}

/* 1st level item / ws title */
h2 {
  font-size: 150%;
  /* border-bottom: 1px solid #CCCCCC;
  padding-bottom: 20px;
  margin-bottom: 0px !important; */
  /* margin: 15px 10px 10px 30px !important; */
}

/* Tablist item */
h4 {
  margin: 10px 0px 0px 0px !important;
}
</style>
