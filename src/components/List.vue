<template>
  <div class="ui relaxed divided items">
    <ws-list-item v-for="ws in wsAsArray"
      :key="ws.name"
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
    ...mapGetters(['allWS']),
    wsAsArray () {
      const ws = this.allWS
      return Object.keys(ws).map(name => {
        return { name, tabs: ws[name] }
      })
    }
  }
}
</script>

<style scoped>
/* .container {
  width: auto;
} */
</style>
