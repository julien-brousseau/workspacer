<template>
  <div id="app" class="ui">

    <ws-menu></ws-menu>
    <ws-list></ws-list>

  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import List from './components/List.vue'

export default {
  components: {
    wsMenu: Menu,
    wsList: List
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
