<template>
  <div id="ws-list">

    <ul>
      <wsListItem></wsListItem>
    </ul>

  </div>
</template>

<script>
import ListItem from './ListItem'

export default {
  components: {
    wsListItem: ListItem
  },
  props: {}
}
</script>

<style scoped>

</style>
