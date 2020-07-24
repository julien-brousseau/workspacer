<template>
  <div class="item">
    <div class="content">
     {{ ws.name }}
     <a @click="showTabs = !showTabs">({{ ws.tabs.length }} tabs)</a>
     <button @click="addTabToWS(ws.name)" class="ui mini green button right floated">ADD</button>
     <button @click="blop" class="ui mini primary button right floated">LOAD</button>
     <ul v-if="showTabs" style="min-height: 0px;">
       <li v-for="tab in ws.tabs" :key="tab.id">{{ tab.url }}</li>
     </ul>
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
  methods: {
    ...mapActions(['addTabToWS']),
    blop () { return false }
  }
}
</script>

<style scoped>
.item {
  width: auto;
  padding: 15px;
  border-bottom: 1px solid lightgray;
}
.content {
  width:auto;
}
</style>
