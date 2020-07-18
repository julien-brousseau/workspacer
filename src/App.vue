<template>
  <div id="app">

    <wsMenu :blop="thisBlop"></wsMenu>
    <wsList></wsList>

  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import List from './components/List.vue'

export default {
  data: function () {
    return {
      thisBlop: 'Blop from above'
    }
  },
  components: {
    wsMenu: Menu,
    wsList: List
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
