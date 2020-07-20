<template>
  <div id="app">

    <ws-menu></ws-menu>
    <ws-list></ws-list>

  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import List from './components/List.vue'

// import { mapActions } from 'vuex'

export default {
  components: {
    wsMenu: Menu,
    wsList: List
  },
  methods: {
    // ...mapActions(['loadAllWS'])
    // setBlop () {
    // this.$browser.storage.local.get('value')
    //   .then(result => { this.blop = result })
    // }
  }
}
</script>

<style scoped>
#app {
  border: 1px solid lightgray;
  width: 300px;
  height: 500px;
  text-align: center;
  color: #333333;
  padding: 20px;
}
</style>
