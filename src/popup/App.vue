<template>
  <div id="app" class="ui">

    <ws-loading v-if="loading"></ws-loading>

    <div v-else class="content">
      <ws-details v-if="addingWS || editingWS"></ws-details>
      <ws-list v-else></ws-list>
    </div>

  </div>
</template>

<script>
import WSList from '../views/List.vue'
import WSDetails from '../views/Details.vue'
import Loading from '../components/items/Loading.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    wsList: WSList,
    wsDetails: WSDetails,
    wsLoading: Loading
  },
  computed: {
    ...mapGetters(['addingWS', 'editingWS', 'allWS', 'allTabs']),
    loading () { return this.allWS === null || this.allTabs === null }
  },
  created () {
    this.$store.dispatch('loadWS')
  }
}
</script>

<style lang="scss">
#app {
  min-width: 800px !important;
  height: 800px !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #333333; */
  color: #2c3e50;
  padding: 30px;
  margin: 0px;
}

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
}

/* Label */
h3 {
  font-size: 110%;
}

/* Tablist item */
h4 {
  margin: 10px 0px 0px 0px !important;
}
</style>
