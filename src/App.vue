<template>
  <div id="app">

    <wsMenu></wsMenu>
    <wsList></wsList>

  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    wsMenu: Menu,
    wsList: List
  }
}
</script>

<style>
#app {
  border: 1px solid lightgray;
  width: 300px;
  height: 500px;
  text-align: center;
  color: #333333;
  margin-top: 60px;
}
</style>
