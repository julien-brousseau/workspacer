<template>
  <div class="ui segment">

    {{ ws.name }}
    <a @click="showTabs = !showTabs">({{ ws.tabs.length }} tabs)</a>

    <button @click="addTabToWS(ws.name)" class="ui mini green button right floated">ADD</button>
    <button @click="blop" class="ui mini primary button right floated">LOAD</button>
    <button @click="blop" class="ui mini red button right floated">DEL</button>

     <div v-if="showTabs" class="ui segments">
       <div v-for="tab in ws.tabs" :key="tab.id" class="ui segment">
          <p>{{ tab.title }}<br><small>{{ tab.url | shortURL }}</small></p>
       </div>
     </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showTabs: false
    }
  },
  props: ['ws'],
  filters: {
    shortURL (url) { return url.slice(0, 40) + '...' }
  },
  methods: {
    ...mapActions(['addTabToWS']),
    blop () { return false }
  }
}
</script>

<style scoped>
small {
  font-style: italic;
  color: #CCCCCC;
}
</style>
