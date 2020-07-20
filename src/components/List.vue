<template>
  <div id="ws-list" class="ui main text container">

    <p>{{ getAllWS }}</p>

    <ul>
      <ws-list-item></ws-list-item>
    </ul>

  </div>
</template>

<script>
import ListItem from './ListItem'
import { mapGetters } from 'vuex'

export default {
  components: {
    wsListItem: ListItem
  },
  computed: {
    ...mapGetters(['getAllWS'])
  }
}
</script>

<style scoped>
.container {
  width: auto;
}
</style>
