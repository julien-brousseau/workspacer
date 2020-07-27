<template>
  <div id="app" class="ui">

    <ws-menu></ws-menu>
    <ws-list></ws-list>

  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import WSList from './components/WSList.vue'

export default {
  components: {
    wsMenu: Menu,
    wsList: WSList
  },
  created () {
    this.$store.dispatch('initWS')
  }
}
</script>

<style scoped>
#app {
  border: 1px solid lightgray;
  width: 400px;
  height: auto;
  text-align: center;
  color: #333333;
  padding: 20px;
}
</style>
