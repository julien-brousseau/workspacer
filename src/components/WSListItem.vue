<template>
  <div class="item">
    <div class="content">

     {{ ws.name }}
     <a @click="showTabs = !showTabs">({{ ws.tabs.length }} tabs)</a>

     <button @click="addTabToWS(ws.name)" class="ui mini green button right floated">ADD</button>
     <button @click="blop" class="ui mini primary button right floated">LOAD</button>
     <button @click="blop" class="ui mini red button right floated">DEL</button>

     <div v-if="showTabs" class="ui items">
       <div v-for="tab in ws.tabs" :key="tab.id" class="item">
        <div class="content">
          <h6>{{ tab.title }}</h6>
          <small>{{ tab.url }}</small>
        </div>
       </div>
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
  methods: {
    ...mapActions(['addTabToWS']),
    blop () { return false }
  }
}
</script>

<style scoped>
h6 {
  margin-bottom: 0px;
}
small {
  margin-top: 0px;
  padding-top: 0px;
  font-style: italic;
  color: #CCCCCC;
}
</style>
