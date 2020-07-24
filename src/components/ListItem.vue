<template>
  <div class="item">
    <div class="content">
     {{ ws.name }}
     <a @click="showTabs = !showTabs">({{ ws.tabs.length }} tabs)</a>
     <button @click="addTabToWS(ws.name)" class="ui mini green button right floated">ADD CURRENT TAB</button>
     <ul v-if="showTabs">
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
    ...mapActions(['addTabToWS'])
  },
  computed: {
    // ...mapGetters([''])
    //   return Object.keys(this.ws)[0]
    // },
    // urls () {
    //   return this.ws[this.name]
    // }
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
