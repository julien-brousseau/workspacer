<template>
  <div class="ui items">
    <div v-for="tab in tabs" :key="tab.id" class="item tab">

      <!-- <button v-if="!tabSelected(tab.id)" class="ui button icon basic">
        <i class="icon pin"></i></button> -->

      <tab-controls v-if="!tabSelected(tab.id)"></tab-controls>

      <div v-if="tab.id === selectedTab" class="content ui relaxed grid">
          <input class="six wide column" type="text" placeholder="Name" v-model="tab.title">
          <input class="nine wide column" type="text" placeholder="URL" v-model="tab.url">
      </div>

      <div v-else class="content">
        <h4>{{ tab.title }}</h4>
        <p>{{ tab.url }}</p>
      </div>

      <div class="actions right floated">
        <div class="ui buttons">

          <button class="ui button icon basic large"
            @click="tabSelected(tab.id) ? saveTab(tab.id) : editTab(tab.id)">
              <i class="icon" :class="tabSelected(tab.id) ? 'save' : 'pencil'"></i></button>
          <button class="ui button icon basic large"
            @click="tabSelected(tab.id) ? cancel() : deleteTab(tab.id)">
              <i class="icon" :class="tabSelected(tab.id) ? 'close' : 'trash'"></i></button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TabControls from './TabControls.vue'

export default {
  components: {
    tabControls: TabControls
  },
  props: ['tabs'],
  data () {
    return {
      selectedTab: null
    }
  },
  computed: {
    ...mapGetters([''])
  },
  methods: {
    tabSelected (id) { return this.selectedTab === id },
    editTab (id) {
      this.selectedTab = id
    },
    saveTab (id) {
      // Save tab code...
      this.selectedTab = null
    },
    cancel () {
      this.selectedTab = null
    },
    deleteTab (id) {
      // this.workspace.tabs = this.workspace.tabs.filter(t => t.id !== id)
    }
    // moveTab (id, direction) {
    //
    // }
    // pinTab (id) {
    //
    // }
  }
}
</script>

<style scoped>
.item {
  border-top: 1px solid #EEEEEE;
  padding: 20px 5px 5px 10px !important;
  margin: 0px !important;
}
.item:hover {
  border-left: 7px solid rgb(33, 133, 208) !important;
  border-right: 2px solid rgb(33, 133, 208) !important;
/*   color: blue; */
}
</style>
