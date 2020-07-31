<template>
<div class="ui attached segment" style="padding-top: 40px">
  <button @click="clearWS" class="ui tiny red button right floated" style="margin-top: 26px">Reset</button>
  <h2 @click="selected = null">All Workspaces</h2>
  <div class="ui segments">
    <ws-list-item v-for="ws in wsAsArray"
      :key="ws.name"
      :ws="ws">
    </ws-list-item>
  </div>
</div>
</template>

<script>
import WSListItem from './WSListItem'
import { mapGetters, mapActions } from 'vuex'

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
  },
  methods: {
    ...mapActions(['clearWS'])
  }
}
</script>

<style scoped>
</style>
