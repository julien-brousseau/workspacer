<template>
  <div class="ui segments">
    <ws-list-item v-for="ws in wsAsArray"
      :key="ws.name"
      :ws="ws">
    </ws-list-item>
  </div>
</template>

<script>
import WSListItem from './WSListItem'
import { mapGetters } from 'vuex'

export default {
  components: {
    wsListItem: WSListItem
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
