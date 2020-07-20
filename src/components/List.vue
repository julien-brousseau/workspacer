<template>
  <div class="ui relaxed divided items">
    <ws-list-item v-for="ws in allWS"
      :key="ws"
      :ws="ws">
    </ws-list-item>
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
    ...mapGetters(['allWS'])
  }
}
</script>

<style scoped>
/* .container {
  width: auto;
} */
</style>
